import { Injectable } from '@nestjs/common';
import { QuizRepository } from 'src/core/data';
import { QuizListDTO } from 'src/core/dtos/quiz-list.dto';
import { UserId } from 'src/core/entities';
import { Page } from 'src/core/interfaces/page';

export interface ListAnsweredQuizzesUseCaseRequest {
  userId: UserId;
  page: number;
  pageSize: number;
}

export type ListAnsweredQuizzesUseCaseResponse = Page<QuizListDTO>;

export abstract class ListAnsweredQuizzesUseCase {
  abstract execute(
    request: ListAnsweredQuizzesUseCaseRequest,
  ): Promise<ListAnsweredQuizzesUseCaseResponse>;
}

@Injectable()
export class ListAnsweredQuizzesUseCaseImpl
  implements ListAnsweredQuizzesUseCase
{
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    userId,
    page,
    pageSize,
  }: ListAnsweredQuizzesUseCaseRequest): Promise<ListAnsweredQuizzesUseCaseResponse> {
    const quizzesPage = await this._quizRepository.list({
      page,
      pageSize,
      answeredBy: userId,
    });

    return {
      ...quizzesPage,
      items: quizzesPage.items.map(({ questions, ...quiz }) => ({
        ...quiz,
        numberOfQuestions: questions.length,
      })),
    };
  }
}
