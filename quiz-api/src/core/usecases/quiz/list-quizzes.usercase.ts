import { Injectable } from '@nestjs/common/decorators';

import { QuizRepository } from 'src/core/data';
import { QuizListDTO } from 'src/core/dtos';
import { Page } from 'src/core/interfaces/page';

export interface ListQuizzesUseCaseRequest {
  page: number;
  pageSize: number;
}

export type ListQuizzesUseCaseResponse = Page<QuizListDTO>;

export abstract class ListQuizzesUseCase {
  abstract execute(
    request: ListQuizzesUseCaseRequest,
  ): Promise<ListQuizzesUseCaseResponse>;
}

@Injectable()
export class ListQuizzesUseCaseImpl implements ListQuizzesUseCase {
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    page,
    pageSize,
  }: ListQuizzesUseCaseRequest): Promise<ListQuizzesUseCaseResponse> {
    const quizzesPage = await this._quizRepository.list({ page, pageSize });

    console.log(JSON.stringify(quizzesPage, null, 2));

    return {
      ...quizzesPage,
      items: quizzesPage.items.map((item) => ({
        date: item.date,
        description: item.description,
        id: item.id,
        name: item.name,
        numberOfQuestions: item.questions.length,
      })),
    };
  }
}
