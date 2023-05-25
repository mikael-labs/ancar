import { Injectable } from '@nestjs/common';
import { QuizRepository } from 'src/core/data';
import { CreateQuestionDTO } from 'src/core/dtos/create-question.dto';
import { QuizDTO } from 'src/core/dtos/quiz.dto';
import { Answer, Question, Quiz, QuizId } from 'src/core/entities';
import { NotFoundError } from 'src/core/errors';

export interface UpdateQuizUseCaseRequest {
  id: QuizId;
  name: string;
  date: number;
  description: string;
  questions: CreateQuestionDTO[];
}

export type UpdateQuizUseCaseResponse = QuizDTO;

export abstract class UpdateQuizUseCase {
  abstract execute(
    request: UpdateQuizUseCaseRequest,
  ): Promise<UpdateQuizUseCaseResponse>;
}

@Injectable()
export class UpdateQuizUseCaseImpl implements UpdateQuizUseCase {
  constructor(private _quizRepository: QuizRepository) {}

  async execute({
    id,
    name,
    date,
    questions: questionsDTO,
    description,
  }: UpdateQuizUseCaseRequest): Promise<UpdateQuizUseCaseResponse> {
    const quiz = await this._quizRepository.getById(id);

    if (!quiz) throw new NotFoundError('Quiz não encontrado');

    const questions = questionsDTO.map((questionDTO) => {
      const answers = questionDTO.answers.map((answer) => new Answer(answer));

      return new Question({ ...questionDTO, answers });
    });

    const updatedQuiz = new Quiz({
      id,
      date,
      description,
      name,
      questions,
      user: quiz.user,
    });

    return this._quizRepository.update(updatedQuiz);
  }
}
