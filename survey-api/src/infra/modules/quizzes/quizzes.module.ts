import { Module } from '@nestjs/common';
import {
  AnswerQuizUseCase,
  AnswerQuizUseCaseImpl,
} from 'src/core/usecases/quiz/answer-quiz.usecase';
import {
  CreateQuizUseCase,
  CreateQuizUseCaseImpl,
} from 'src/core/usecases/quiz/create-quiz.usecase';
import {
  DeleteQuizUseCase,
  DeleteQuizUseCaseImpl,
} from 'src/core/usecases/quiz/delete-quiz.usecase';
import {
  GetQuizByIdUseCase,
  GetQuizByIdUseCaseImpl,
} from 'src/core/usecases/quiz/get-quiz-by-id.usecase';
import {
  ListAnsweredQuizzesUseCase,
  ListAnsweredQuizzesUseCaseImpl,
} from 'src/core/usecases/quiz/list-answered-quizes.usecase';
import {
  ListMyQuizzesUseCase,
  ListMyQuizzesUseCaseImpl,
} from 'src/core/usecases/quiz/list-my-quizzes.usecase';
import {
  ListQuizzesToAnswerUseCase,
  ListQuizzesToAnswerUseCaseImpl,
} from 'src/core/usecases/quiz/list-quizzes-to-answer.usecase';
import {
  ListQuizzesUseCase,
  ListQuizzesUseCaseImpl,
} from 'src/core/usecases/quiz/list-quizzes.usercase';
import {
  UpdateQuizUseCase,
  UpdateQuizUseCaseImpl,
} from 'src/core/usecases/quiz/update-quiz.usecase';

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
  ],
})
export class QuizzesModule {}
