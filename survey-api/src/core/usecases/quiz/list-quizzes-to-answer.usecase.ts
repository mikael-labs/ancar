import { Injectable } from '@nestjs/common';
import { QuizRepository } from 'src/core/data';
import { QuizListDTO } from 'src/core/dtos';
import { UserId } from 'src/core/entities';
import { Page } from 'src/core/interfaces/page';

export interface ListQuizzesToAnswerUseCaseRequest {
  userId: UserId;
  page: number;
  pageSize: number;
}

export type ListQuizzesToAnswerUseCaseResponse = Page<QuizListDTO>;

export abstract class ListQuizzesToAnswerUseCase {
  abstract execute(
    request: ListQuizzesToAnswerUseCaseRequest,
  ): Promise<ListQuizzesToAnswerUseCaseResponse>;
}

@Injectable()
export class ListQuizzesToAnswerUseCaseImpl
  implements ListQuizzesToAnswerUseCase
{
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    page,
    pageSize,
    userId,
  }: ListQuizzesToAnswerUseCaseRequest): Promise<ListQuizzesToAnswerUseCaseResponse> {
    const quizzesPage = await this._quizRepository.list({
      notAnsweredBy: userId,
      page,
      pageSize,
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
