import { Injectable } from '@nestjs/common';
import { QuizAnswerRepository } from 'src/core/data';
import { QuizId, UserQuizAnswer } from 'src/core/entities';
import { Page } from 'src/core/interfaces/page';

export interface ListAnswersUseCaseRequest {
  quizId: QuizId;
  page: number;
  pageSize: number;
}

export type ListAnswersUseCaseResponse = Page<UserQuizAnswer>;

export abstract class ListAnswersUseCase {
  abstract execute(
    request: ListAnswersUseCaseRequest,
  ): Promise<ListAnswersUseCaseResponse>;
}

@Injectable()
export class ListAnswersUseCaseImpl implements ListAnswersUseCase {
  constructor(private _answersRepository: QuizAnswerRepository) {}

  async execute(
    request: ListAnswersUseCaseRequest,
  ): Promise<ListAnswersUseCaseResponse> {
    return this._answersRepository.listByQuiz(request);
  }
}
