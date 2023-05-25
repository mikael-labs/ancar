import { Injectable } from '@nestjs/common';
import { QuizRepository } from 'src/core/data';
import { QuizDTO } from 'src/core/dtos/quiz.dto';
import { QuizId } from 'src/core/entities';

export interface GetQuizByIdUseCaseRequest {
  id: QuizId;
}

export type GetQuizByIdUseCaseResponse = QuizDTO | null;

export abstract class GetQuizByIdUseCase {
  abstract execute(
    request: GetQuizByIdUseCaseRequest,
  ): Promise<GetQuizByIdUseCaseResponse>;
}

@Injectable()
export class GetQuizByIdUseCaseImpl implements GetQuizByIdUseCase {
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    id,
  }: GetQuizByIdUseCaseRequest): Promise<GetQuizByIdUseCaseResponse> {
    const quiz = await this._quizRepository.getById(id);

    return quiz;
  }
}
