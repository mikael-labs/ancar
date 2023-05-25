import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/data';
import { QuizRepository } from 'src/core/data/quiz.repository';
import { CreateQuestionDTO } from 'src/core/dtos/create-question.dto';
import { QuizDTO } from 'src/core/dtos/quiz.dto';
import { UserId } from 'src/core/entities';
import { Answer } from 'src/core/entities/answer';
import { Question } from 'src/core/entities/question';
import { Quiz } from 'src/core/entities/quiz';
import { NotFoundError } from 'src/core/errors';

export interface CreateQuizUseCaseRequest {
  userId: UserId;
  name: string;
  description: string;
  questions: CreateQuestionDTO[];
}

export type CreateQuizUseCaseResponse = QuizDTO;

export abstract class CreateQuizUseCase {
  abstract execute(
    request: CreateQuizUseCaseRequest,
  ): Promise<CreateQuizUseCaseResponse>;
}

@Injectable()
export class CreateQuizUseCaseImpl implements CreateQuizUseCase {
  constructor(
    private _userRepository: UserRepository,
    private _quizRepository: QuizRepository,
  ) {}

  async execute({
    userId,
    name,
    description,
    questions: questionsDTO,
  }: CreateQuizUseCaseRequest): Promise<CreateQuizUseCaseResponse> {
    const questions = questionsDTO.map((questionDTO) => {
      const answers = questionDTO.answers.map((answer) => new Answer(answer));

      return new Question({ ...questionDTO, answers });
    });

    const user = await this._userRepository.getById(userId);

    if (!user) throw new NotFoundError('Usuário não encontrado');

    const quiz = new Quiz({
      date: Date.now(),
      description,
      name,
      questions,
      user,
    });

    throw new NotFoundError('Usuário não encontrado');

    const createdQuiz = await this._quizRepository.create(quiz);

    return createdQuiz;
  }
}
