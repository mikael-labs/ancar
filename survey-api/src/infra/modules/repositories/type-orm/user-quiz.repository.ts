import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository } from 'src/core/data';
import { UserQuizRepository } from 'src/core/data/user-quiz.repository';
import { QuizId, UserId } from 'src/core/entities';
import { UserQuizAnswer } from 'src/core/entities/user-quiz';
import { DataSource, Repository } from 'typeorm';
import { QuizEntity } from './entities/quiz';
import { UserEntity } from './entities/user';
import { UserQuizAnswerEntity } from './entities/user-quiz-answer';

@Injectable()
export class TypeORMUserQuizRepository implements UserQuizRepository {
  constructor(
    @InjectRepository(UserQuizAnswerEntity)
    private _userQuizRepository: Repository<UserQuizAnswerEntity>,
    @InjectRepository(QuizEntity)
    private _quizRepository: Repository<QuizEntity>,
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async getByQuizAndUser(
    quizId: QuizId,
    userId: UserId,
  ): Promise<UserQuizAnswer | null> {
    const answers = await this._userQuizRepository.find({
      where: {
        quiz: {
          id: quizId,
        },
        user: {
          id: userId,
        },
      },
    });

    const quiz = await this._quizRepository.findOne({ where: { id: quizId } });
    const user = await this._userRepository.findOne({ where: { id: quizId } });

    if (!quiz || !user) return null;

    const userQuiz = new UserQuizAnswer({
      quiz: quiz.toDomain(),
      user: user,
      answers: answers.map((answer) => answer.toDomain()),
    });

    return userQuiz;
  }

  saveQuiz(quiz: UserQuizAnswer): Promise<UserQuizAnswer> {
    const answers = UserQuizAnswerEntity.fromUserQuiz(quiz);

    return this._userQuizRepository.save(answers).then((answers) => {
      const userQuiz = new UserQuizAnswer({
        quiz: quiz.quiz,
        user: quiz.user,
        answers: answers.map((answer) => answer.toDomain()),
      });

      return userQuiz;
    });
  }
}
