import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { QuizAnswerRepository } from 'src/core/data';
import {
  QuizId,
  UserId,
  UserQuizAnswer,
  UserQuizAnswerId,
} from 'src/core/entities';

import { UserQuizAnswerEntity } from './entities/user-quiz-answer';
import { Page } from 'src/core/interfaces/page';

@Injectable()
export class TypeORMUserQuizRepository implements QuizAnswerRepository {
  constructor(
    @InjectRepository(UserQuizAnswerEntity)
    private _userQuizRepository: Repository<UserQuizAnswerEntity>,
  ) {}

  async listByQuiz({
    page,
    pageSize,
    quizId,
  }: {
    quizId: number;
    page: number;
    pageSize: number;
  }): Promise<Page<UserQuizAnswer>> {
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

  async update(quizAnswer: UserQuizAnswer): Promise<UserQuizAnswer> {
    await this._userQuizRepository.update(
      quizAnswer.id,
      UserQuizAnswerEntity.fromDomain(quizAnswer),
    );

    return quizAnswer;
  }

  getById(quizAnwerId: number): Promise<UserQuizAnswer | null> {
    return this._userQuizRepository
      .findOne({ where: { id: quizAnwerId } })
      .then((quizAnswer) => quizAnswer?.toDomain() ?? null);
  }

  async delete(
    quizAnswerId: UserQuizAnswerId | UserQuizAnswerId[],
  ): Promise<void> {
    if (!Array.isArray(quizAnswerId)) quizAnswerId = [quizAnswerId];

    await this._userQuizRepository.delete(quizAnswerId);
  }

  async getByQuizAndUser(
    quizId: QuizId,
    userId: UserId,
  ): Promise<UserQuizAnswer[]> {
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

    return answers.map((answer) => answer.toDomain());
  }

  saveUserQuizAnswers(answers: UserQuizAnswer[]): Promise<UserQuizAnswer[]> {
    const answersDB = answers.map((answer) =>
      UserQuizAnswerEntity.fromDomain(answer),
    );

    return this._userQuizRepository
      .save(answersDB)
      .then((answersDB) => answersDB.map((answerDB) => answerDB.toDomain()));
  }
}
