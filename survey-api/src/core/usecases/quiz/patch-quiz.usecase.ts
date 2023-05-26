import { Injectable } from '@nestjs/common';
import { QuizRepository } from 'src/core/data';
import { Answer, Question, Quiz, QuizId } from 'src/core/entities';
import { NotFoundError } from 'src/core/errors';
import { QuizDTO } from 'src/core/dtos';
import { CreateQuizRequest } from 'src/infra/modules/quizzes/requests';

export type PatchQuizUseCaseRequest = Partial<CreateQuizRequest> & {
  id: QuizId;
};

export type PatchQuizUseCaseResponse = QuizDTO;

export abstract class PatchQuizUseCase {
  abstract execute(
    request: PatchQuizUseCaseRequest,
  ): Promise<PatchQuizUseCaseResponse>;
}

@Injectable()
export class PatchQuizUseCaseImpl implements PatchQuizUseCase {
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    id,
    questions: questionsRequest,
    ...patchQuizProps
  }: PatchQuizUseCaseRequest): Promise<PatchQuizUseCaseResponse> {
    const quiz = await this._quizRepository.getById(id);

    if (!quiz) throw new NotFoundError(`Quiz com id ${id} não encontrado`);

    const questions =
      questionsRequest?.map(
        ({ answers: answersRequest, ...questionRequest }) => {
          const answers = answersRequest.map(
            (answer) => new Answer({ ...answer }),
          );

          return new Question({ ...questionRequest, answers });
        },
      ) ?? quiz.questions;

    const patchedQuiz = new Quiz({
      ...quiz,
      questions,
      ...patchQuizProps,
    });

    return this._quizRepository
      .update(patchedQuiz)
      .then((quiz) => QuizDTO.fromDomain(quiz));
  }
}
