import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { QuizAnswerRepository } from 'src/core/data';
import { QuizId, UserId, QuizAnswer, QuizAnswerId } from 'src/core/entities';

import { QuizAnswerEntity } from './entities/quiz-answer';
import { Page } from 'src/core/interfaces/page';

@Injectable()
export class TypeORMUQuizAnswerRepository implements QuizAnswerRepository {
  constructor(
    @InjectRepository(QuizAnswerEntity)
    private _userQuizRepository: Repository<QuizAnswerEntity>,
  ) {}

  listAllByQuiz(quizId: number): Promise<QuizAnswer[]> {
    return this._userQuizRepository
      .find({
        where: {
          quiz: {
            id: quizId,
          },
        },
        relations: {
          question: {
            answers: true,
          },
          quiz: true,
          answer: true,
        },
      })
      .then((answersDB) => answersDB.map((answerDB) => answerDB.toDomain()));
  }

  async listByQuiz({
    page,
    pageSize,
    quizId,
  }: {
    quizId: number;
    page: number;
    pageSize: number;
  }): Promise<Page<QuizAnswer>> {
    const skip = (page - 1) * pageSize;

    const [quizAnswers, total] = await this._userQuizRepository.findAndCount({
      where: {
        quiz: {
          id: quizId,
        },
      },
      relations: {
        quiz: true,
        answer: true,
        question: true,
      },
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);
    const nextPage = page >= totalPages ? null : page + 1;

    return {
      items: quizAnswers.map((quizAnswer) => quizAnswer.toDomain()),
      nextPage,
      totalPages,
      total,
      page,
    };
  }

  async update(quizAnswer: QuizAnswer): Promise<QuizAnswer> {
    await this._userQuizRepository.update(
      quizAnswer.id,
      QuizAnswerEntity.fromDomain(quizAnswer),
    );

    return quizAnswer;
  }

  getById(quizAnwerId: number): Promise<QuizAnswer | null> {
    return this._userQuizRepository
      .findOne({ where: { id: quizAnwerId } })
      .then((quizAnswer) => quizAnswer?.toDomain() ?? null);
  }

  async delete(quizAnswerId: QuizAnswerId | QuizAnswerId[]): Promise<void> {
    if (!Array.isArray(quizAnswerId)) quizAnswerId = [quizAnswerId];

    await this._userQuizRepository.delete(quizAnswerId);
  }

  async getByQuizAndUser(
    quizId: QuizId,
    userId: UserId,
  ): Promise<QuizAnswer[]> {
    const answers = await this._userQuizRepository.find({
      where: {
        quiz: {
          id: quizId,
        },
        user: {
          id: userId,
        },
      },
      relations: {
        question: true,
        quiz: true,
      },
    });

    return answers.map((answer) => answer.toDomain());
  }

  saveUserQuizAnswers(answers: QuizAnswer[]): Promise<QuizAnswer[]> {
    const answersDB = answers.map((answer) =>
      QuizAnswerEntity.fromDomain(answer),
    );

    return this._userQuizRepository
      .save(answersDB)
      .then((answersDB) => answersDB.map((answerDB) => answerDB.toDomain()));
  }
}
