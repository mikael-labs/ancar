import { Injectable } from '@nestjs/common';
import { QuizAnswerRepository } from 'src/core/data';
import { QuizAnswerId, QuizId } from 'src/core/entities';

export interface DeleteAnswerUseCaseRequest {
  quizAnswerId: QuizAnswerId;
}

export type DeleteAnswerUseCaseResponse = void;

export abstract class DeleteAnswerUseCase {
  abstract execute(
    request: DeleteAnswerUseCaseRequest,
  ): Promise<DeleteAnswerUseCaseResponse>;
}

@Injectable()
export class DeleteAnswerUseCaseImpl implements DeleteAnswerUseCase {
  constructor(private _quizAnswerRepository: QuizAnswerRepository) {}

  async execute({
    quizAnswerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    return this._quizAnswerRepository.delete(quizAnswerId);
  }
}
