import { Injectable } from '@nestjs/common';
import { BadRequestError, NotFoundError } from 'src/core/errors';
import { QuizRepository, UserRepository } from '../../data';
import { UserQuizRepository } from '../../data/user-quiz.repository';
import { AnswerId, QuestionId, QuizId, UserId } from '../../entities';
import { QuizAnswer } from '../../entities/quiz-answer';
import { UserQuizAnswer } from '../../entities/user-quiz';

export interface AnswerQuizUseCaseRequest {
  userId: UserId;
  quizId: QuizId;
  answers: {
    questionId: QuestionId;
    answerId: AnswerId;
  }[];
}

export type AnswerQuizUseCaseResponse = any;

export abstract class AnswerQuizUseCase {
  abstract execute(
    request: AnswerQuizUseCaseRequest,
  ): Promise<AnswerQuizUseCaseResponse>;
}

@Injectable()
export class AnswerQuizUseCaseImpl implements AnswerQuizUseCase {
  constructor(
    private _userRepository: UserRepository,
    private _quizRepository: QuizRepository,
    private _userQuizRepository: UserQuizRepository,
  ) {}

  async execute({
    userId,
    quizId,
    answers: answersRequest,
  }: AnswerQuizUseCaseRequest): Promise<AnswerQuizUseCaseResponse> {
    const user = await this._userRepository.getById(userId);

    if (!user) throw new NotFoundError('Usuário não encontrado.');

    const quiz = await this._quizRepository.getById(quizId);

    if (!quiz) throw new NotFoundError('Quiz não encontrado.');

    const alreadyHaveAnswered = await this._userQuizRepository.getByQuizAndUser(
      quizId,
      userId,
    );

    if (alreadyHaveAnswered)
      throw new BadRequestError('Você já respondeu esse questionário');

    const quizAnswers = answersRequest.map((answerRequest) => {
      const question = quiz.questions.find(
        (question) => question.id === answerRequest.questionId,
      );

      if (!question)
        throw new NotFoundError(
          `Pergunta ${answerRequest.questionId} não encontrada.`,
        );

      const answer = question.answers.find(
        (answer) => answer.id === answerRequest.answerId,
      );

      if (!answer)
        throw new NotFoundError(
          `Alternativa ${answerRequest.answerId} não encontrada.`,
        );

      return new QuizAnswer({
        question,
        answer,
      });
    });

    const userQuiz = new UserQuizAnswer({ user, quiz, answers: quizAnswers });

    return this._userQuizRepository.saveQuiz(userQuiz);
  }
}
