import { Module } from '@nestjs/common';
import {
  AddAnswersUseCase,
  AddAnswersUseCaseImpl,
  DeleteAnswerUseCase,
  DeleteAnswerUseCaseImpl,
  ListAnswersUseCase,
  ListAnswersUseCaseImpl,
  UpdateAnswerUseCase,
  UpdateAnswerUseCaseImpl,
} from 'src/core/usecases/answers';

import {
  AnswerQuizUseCase,
  AnswerQuizUseCaseImpl,
  CreateQuizUseCase,
  CreateQuizUseCaseImpl,
  DeleteQuizUseCase,
  DeleteQuizUseCaseImpl,
  GetQuizByIdUseCase,
  GetQuizByIdUseCaseImpl,
  ListAnsweredQuizzesUseCase,
  ListAnsweredQuizzesUseCaseImpl,
  ListMyQuizzesUseCase,
  ListMyQuizzesUseCaseImpl,
  ListQuizzesToAnswerUseCase,
  ListQuizzesToAnswerUseCaseImpl,
  ListQuizzesUseCase,
  ListQuizzesUseCaseImpl,
  UpdateQuizUseCase,
  UpdateQuizUseCaseImpl,
} from 'src/core/usecases/quiz';

import { QuizzesController } from './quizzes.controller';

@Module({
  controllers: [QuizzesController],
  providers: [
    { provide: CreateQuizUseCase, useClass: CreateQuizUseCaseImpl },
    { provide: DeleteQuizUseCase, useClass: DeleteQuizUseCaseImpl },
    { provide: ListQuizzesUseCase, useClass: ListQuizzesUseCaseImpl },
    { provide: GetQuizByIdUseCase, useClass: GetQuizByIdUseCaseImpl },
    { provide: UpdateQuizUseCase, useClass: UpdateQuizUseCaseImpl },
    { provide: AnswerQuizUseCase, useClass: AnswerQuizUseCaseImpl },
    {
      provide: ListQuizzesToAnswerUseCase,
      useClass: ListQuizzesToAnswerUseCaseImpl,
    },
    {
      provide: ListAnsweredQuizzesUseCase,
      useClass: ListAnsweredQuizzesUseCaseImpl,
    },
    {
      provide: ListMyQuizzesUseCase,
      useClass: ListMyQuizzesUseCaseImpl,
    },
    {
      provide: AddAnswersUseCase,
      useClass: AddAnswersUseCaseImpl,
    },
    {
      provide: UpdateAnswerUseCase,
      useClass: UpdateAnswerUseCaseImpl,
    },
    {
      provide: DeleteAnswerUseCase,
      useClass: DeleteAnswerUseCaseImpl,
    },
    {
      provide: ListAnswersUseCase,
      useClass: ListAnswersUseCaseImpl,
    },
  ],
})
export class QuizzesModule {}
