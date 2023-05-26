import { Injectable } from '@nestjs/common';

import { QuizRepository, UserRepository } from 'src/core/data';

import { CreateQuestionDTO, QuizDTO } from 'src/core/dtos';

import { UserId, Answer, Question, Quiz } from 'src/core/entities';

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

    return this._quizRepository.create(quiz).then(QuizDTO.fromDomain);
  }
}
