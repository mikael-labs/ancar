import { Injectable } from '@nestjs/common';
import {
  QuizRepository,
  QuizAnswerRepository,
  UserRepository,
} from 'src/core/data';
import { QuestionDTO } from 'src/core/dtos';
import {
  Answer,
  AnswerId,
  QuestionId,
  QuizId,
  UserId,
  QuizAnswer,
} from 'src/core/entities';
import { BadRequestError, NotFoundError } from 'src/core/errors';

export interface AddAnswersUseCaseRequest {
  userId: UserId;
  quizId: QuizId;
  answers: {
    questionId: QuestionId;
    answerId: AnswerId;
  }[];
}

export type AddAnswersUseCaseResponse = {
  question: Omit<QuestionDTO, 'answers'>;
  answer: Answer;
}[];

export abstract class AddAnswersUseCase {
  abstract execute(
    request: AddAnswersUseCaseRequest,
  ): Promise<AddAnswersUseCaseResponse>;
}

@Injectable()
export class AddAnswersUseCaseImpl implements AddAnswersUseCase {
  constructor(
    private _userRepository: UserRepository,
    private _quizRepository: QuizRepository,
    private _userQuizRepository: QuizAnswerRepository,
  ) {}

  async execute({
    quizId,
    userId,
    answers: answersRequest,
  }: AddAnswersUseCaseRequest): Promise<AddAnswersUseCaseResponse> {
    const user = await this._userRepository.getById(userId);

    if (!user) throw new NotFoundError('Usuário não encontrado.');

    const quiz = await this._quizRepository.getById(quizId);

    if (!quiz) throw new NotFoundError('Quiz não encontrado.');

    const userQuizAnswers = await this._userQuizRepository.getByQuizAndUser(
      quizId,
      userId,
    );

    if (userQuizAnswers.length > 0)
      throw new BadRequestError('Usuário já respondeu esse questionário');

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
        user,
        quiz,
        question,
        answer,
      });
    });

    return this._userQuizRepository
      .saveUserQuizAnswers(quizAnswers)
      .then((answers) =>
        answers.map((quizAnswers) => {
          const { answers: questionAnswers, ...question } =
            quizAnswers.question;

          return {
            question,
            answer: quizAnswers.answer,
          };
        }),
      );
  }
}
