import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, NotBrackets, Repository } from 'typeorm';

import { QuizRepository } from 'src/core/data';
import {
  Answer,
  Question,
  QuestionId,
  User,
  UserId,
  Quiz,
  QuizId,
} from 'src/core/entities';

import { Page } from 'src/core/interfaces/page';
import { QuizEntity } from './entities/quiz';

type ListQuizzesWithNumberOfAnswersQueryResult = {
  quizid: number;
  quizname: string;
  quizuserid: number;
  quizdescription: string;
  quizdate: number;
  questionid: number;
  questiondescription: string;
  questionquizid: number;
  answerid: number;
  answerquestionid: number;
  answerdescription: string;
  numberofanswers: string;
  userid: number;
  username: string;
  usercpf: string;
  userpassword: string;
  total: number;
};

@Injectable()
export class TypeORMQuizRepository implements QuizRepository {
  constructor(
    @InjectRepository(QuizEntity)
    private _quizRepository: Repository<QuizEntity>,
  ) {}

  async listQuizzesWithNumberOfAnswers({
    page,
    pageSize,
    userId,
  }: {
    page: number;
    pageSize: number;
    userId: UserId;
  }): Promise<Page<Quiz & { numberOfAnswers: number }>> {
    const skip = (page - 1) * pageSize;

    const results = await this._quizRepository.manager.query<
      ListQuizzesWithNumberOfAnswersQueryResult[]
    >(
      `SELECT qui.id as quizId, qui.name as quizName, qui."userId" as quizUserId, qui.description as quizDescription, qui.date as quizDate, 
        que.id as questionId, que.description as questionDescription, que."quizId" as questionQuizId, 
        a.id as answerId, a."questionId" as answerQuestionId, a.description as answerDescription, 
        u.id as userId, u.name as userName, u."CPF" as userCPF, u.password as userPassword,
        joint.numberOfAnswers, COUNT(*) OVER () as total     
      FROM quiz qui
        LEFT JOIN question que ON que."quizId" = qui.id
        LEFT JOIN answer a ON que.id = a."questionId"
        LEFT JOIN "user" u ON u.id = qui."userId"
        LEFT JOIN (SELECT ua."quizId", ua."userId", COUNT(DISTINCT (ua."quizId", ua."userId")) as numberOfAnswers FROM "quiz-answer" ua GROUP BY ua."quizId", ua."userId") joint ON joint."quizId" = qui.id
      WHERE qui."userId" = $1
      GROUP BY qui.id, que.id, a.id, u.id, joint.numberOfAnswers
      OFFSET $2 LIMIT $3
    `,
      [userId, skip, pageSize],
    );

    const questionsIds = new Set(results.map((result) => result.questionid));

    const answersPerQuestion: Record<QuestionId, Answer[]> = Array.from(
      questionsIds,
    )
      .map((questionId) => ({
        [questionId]: results.map(
          (result) =>
            new Answer({
              id: result.answerid,
              description: result.answerdescription,
            }),
        ),
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const quizzesIds = new Set(results.map((result) => result.quizid));

    const questionsPerQuiz = Array.from(quizzesIds)
      .map((quizId) => ({
        [quizId]: results.map(
          (result) =>
            new Question({
              id: result.questionid,
              description: result.questiondescription,
              answers: answersPerQuestion[result.questionid] ?? [],
            }),
        ),
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const quizzesInfoEntries: [
      QuizId,
      ListQuizzesWithNumberOfAnswersQueryResult,
    ][] = Array.from(quizzesIds).map((quizId) => [
      quizId,
      results.find((result) => result.quizid === quizId)!,
    ]);

    const quizzesInfo = new Map<
      QuizId,
      ListQuizzesWithNumberOfAnswersQueryResult
    >(quizzesInfoEntries);

    console.log(
      'QUIZZES INFO',
      JSON.stringify(results, null, 2),
      JSON.stringify(quizzesInfo, null, 2),
    );

    const quizzes = Array.from(quizzesInfo.entries()).map(
      ([quizId, quizInfo]) => {
        const quiz = new Quiz({
          id: quizId,
          date: quizInfo.quizdate,
          description: quizInfo.quizdescription,
          name: quizInfo.quizname,
          questions: questionsPerQuiz[quizId] ?? [],
          user: new User({
            id: quizInfo.userid,
            CPF: quizInfo.usercpf,
            name: quizInfo.username,
            password: quizInfo.userpassword,
          }),
        });

        return { ...quiz, numberOfAnswers: parseInt(quizInfo.numberofanswers) };
      },
    );

    const total = results[0]?.total ?? 0;
    const totalPages = Math.ceil(total / pageSize);
    const nextPage = page >= totalPages ? null : page + 1;

    const response = {
      items: quizzes,
      nextPage,
      page,
      total,
      totalPages,
    };

    return response;
  }

  update(quiz: Quiz): Promise<Quiz> {
    const quizDB = QuizEntity.fromDomain(quiz);

    return this._quizRepository.save(quizDB).then(() => quizDB.toDomain());
  }

  getById(quizId: QuizId): Promise<Quiz | null> {
    return this._quizRepository
      .findOne({
        where: { id: quizId },
        relations: { questions: { answers: true }, user: true },
      })
      .then((quizDB) => quizDB?.toDomain() ?? null);
  }

  async list({
    page,
    pageSize,
    answeredBy,
    notAnsweredBy,
  }: {
    page: number;
    pageSize: number;
    answeredBy?: UserId;
    notAnsweredBy?: UserId;
  }): Promise<Page<Quiz>> {
    const skip = (page - 1) * pageSize;

    let query = this._quizRepository.manager.createQueryBuilder(
      QuizEntity,
      'quiz',
    );

    if (answeredBy || notAnsweredBy) {
      query = query
        .leftJoin('quiz.answers', 'answer')
        .leftJoin('answer.user', 'answerUser');

      if (answeredBy) {
        query = query.where('answerUser.id = :userId', { userId: answeredBy });
      } else if (notAnsweredBy) {
        const notAnsweredByUser = new NotBrackets((qb) =>
          qb.where('answerUser.id = :userId', {
            userId: notAnsweredBy,
          }),
        );

        query = query.where(
          new Brackets((qb) =>
            qb.where(notAnsweredByUser).orWhere('answerUser.id IS NULL'),
          ),
        );
      }
    }

    query = query
      .leftJoinAndSelect('quiz.questions', 'question')
      .leftJoinAndSelect('question.answers', 'questionAnswers')
      .leftJoin('quiz.user', 'user')
      .leftJoin('quiz.answers', 'answers');

    if (answeredBy || notAnsweredBy)
      query = query.andWhere(
        new NotBrackets((qb) =>
          qb.where('quiz.user.id = :userId', {
            userId: answeredBy ?? notAnsweredBy!,
          }),
        ),
      );

    query = query.skip(skip).take(pageSize);

    const [quizzesDB, total] = await query.getManyAndCount();

    const quizzes = quizzesDB.map((quizEntity) => quizEntity.toDomain());

    const totalPages = Math.ceil(total / pageSize);
    const nextPage = page >= totalPages ? null : page + 1;

    const quizzesPage: Page<Quiz> = {
      items: quizzes,
      nextPage,
      page,
      total,
      totalPages,
    };

    return quizzesPage;
  }

  async create(quiz: Quiz): Promise<Quiz> {
    const quizDB = QuizEntity.fromDomain(quiz);

    return this._quizRepository.manager
      .save(quizDB)
      .then((quizDB) => quizDB.toDomain());
  }

  async delete(quizId: QuizId): Promise<void> {
    await this._quizRepository.delete(quizId);
  }
}
