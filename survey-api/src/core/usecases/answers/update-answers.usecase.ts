import { Injectable } from '@nestjs/common';
import { QuizRepository, QuizAnswerRepository } from 'src/core/data';
import { AnswerId, UserQuizAnswerId } from 'src/core/entities';
import { NotFoundError } from 'src/core/errors';

export interface UpdateAnswersUseCaseRequest {
  quizAnswerId: UserQuizAnswerId;
  answerId: AnswerId;
}

export type UpdateAnswersUseCaseResponse = any;

export abstract class UpdateAnswerUseCase {
  abstract execute(
    request: UpdateAnswersUseCaseRequest,
  ): Promise<UpdateAnswersUseCaseResponse>;
}

@Injectable()
export class UpdateAnswerUseCaseImpl implements UpdateAnswerUseCase {
  constructor(
    private _quizRepository: QuizRepository,
    private _userQuizRepository: QuizAnswerRepository,
  ) {}

  async execute({
    quizAnswerId,
    answerId,
  }: UpdateAnswersUseCaseRequest): Promise<UpdateAnswersUseCaseResponse> {
    const quizAnswer = await this._userQuizRepository.getById(quizAnswerId);

    if (!quizAnswer) throw new NotFoundError('Resposta não encontrada.');

    const quiz = await this._quizRepository.getById(quizAnswer.quiz.id);

    if (!quiz)
      throw new NotFoundError('Questionário da resposta não encontrado.');

    const quizQuestionsAnswers = quiz.questions
      .map((quetion) => quetion.answers)
      .flat();

    const selectedAnswer = quizQuestionsAnswers.find(
      (answer) => answer.id === answerId,
    );

    if (!selectedAnswer) throw new NotFoundError('Resposta não encontrada.');

    quizAnswer.answer = selectedAnswer;

    return this._userQuizRepository.update(quizAnswer);
  }
}
