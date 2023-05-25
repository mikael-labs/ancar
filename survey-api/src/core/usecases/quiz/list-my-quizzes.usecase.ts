import { Injectable } from '@nestjs/common';

import { QuizRepository } from 'src/core/data';
import { QuizId, UserId } from 'src/core/entities';
import { Page } from 'src/core/interfaces/page';

export interface ListMyQuizzesUseCaseRequest {
  userId: UserId;
  page: number;
  pageSize: number;
}

export type ListMyQuizzesUseCaseResponse = Page<{
  id: QuizId;
  name: string;
  description: string;
  numberOfAnswers: number;
}>;

export abstract class ListMyQuizzesUseCase {
  abstract execute(
    request: ListMyQuizzesUseCaseRequest,
  ): Promise<ListMyQuizzesUseCaseResponse>;
}

@Injectable()
export class ListMyQuizzesUseCaseImpl implements ListMyQuizzesUseCase {
  constructor(private _quizRepository: QuizRepository) {}

  async execute(
    request: ListMyQuizzesUseCaseRequest,
  ): Promise<ListMyQuizzesUseCaseResponse> {
    const quizzesPage =
      await this._quizRepository.listQuizzesWithNumberOfAnswers(request);

    return {
      ...quizzesPage,
      items: quizzesPage.items.map((quiz) => ({
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        numberOfAnswers: quiz.numberOfAnswers,
      })),
    };
  }
}
