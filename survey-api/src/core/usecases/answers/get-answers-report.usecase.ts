import { Injectable } from '@nestjs/common';
import { QuizAnswerRepository, QuizRepository } from 'src/core/data';
import {
  Answer,
  AnswerId,
  Question,
  QuestionId,
  QuizId,
} from 'src/core/entities';
import { NotFoundError } from 'src/core/errors';

export interface GetQuizAnswersReportUseCaseRequest {
  quizId: QuizId;
}

export type GetQuizAnswersReportUseCaseResponse = {
  id: QuizId;
  name: string;
  description: string;
  date: number;
  questions: {
    id: QuestionId;
    description: string;
    answers: { id: AnswerId; description: string; timesSelected: number }[];
  }[];
};

export abstract class GetQuizAnswersReportUseCase {
  abstract execute(
    request: GetQuizAnswersReportUseCaseRequest,
  ): Promise<GetQuizAnswersReportUseCaseResponse>;
}

@Injectable()
export class GetQuizAnswersReportUseCaseImpl
  implements GetQuizAnswersReportUseCase
{
  constructor(
    private _quizRepository: QuizRepository,
    private _quizAnswerRepository: QuizAnswerRepository,
  ) {}

  async execute({
    quizId,
  }: GetQuizAnswersReportUseCaseRequest): Promise<GetQuizAnswersReportUseCaseResponse> {
    const quizAnswers = await this._quizAnswerRepository.listAllByQuiz(quizId);

    const quiz = await this._quizRepository.getById(quizId);

    if (!quiz) throw new NotFoundError('Quiz não encontrado');

    const questions = quiz.questions;

    const timesSelectedMap: Record<AnswerId, number> = {};

    for (const question of questions) {
      for (const answer of question.answers) {
        const timesSelected = quizAnswers.filter(
          (quizAnswer) => quizAnswer.answer.id === answer.id,
        ).length;

        timesSelectedMap[answer.id] = timesSelected;
      }
    }

    const report = questions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => ({
        ...answer,
        timesSelected: timesSelectedMap[answer.id],
      })),
    }));

    return {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      date: quiz.date,
      questions: report,
    };
  }
}
