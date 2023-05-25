import { Injectable } from '@nestjs/common';
import { QuizRepository } from 'src/core/data/quiz.repository';
import { QuizId } from 'src/core/entities/quiz';

export interface DeleteQuizUseCaseRequest {
  id: QuizId;
}

export type DeleteQuizUseCaseResponse = void;

export abstract class DeleteQuizUseCase {
  abstract execute(
    request: DeleteQuizUseCaseRequest,
  ): Promise<DeleteQuizUseCaseResponse>;
}

@Injectable()
export class DeleteQuizUseCaseImpl implements DeleteQuizUseCase {
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    id,
  }: DeleteQuizUseCaseRequest): Promise<DeleteQuizUseCaseResponse> {
    return this._quizRepository.delete(id);
  }
}
