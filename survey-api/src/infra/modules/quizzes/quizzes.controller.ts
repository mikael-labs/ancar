import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common/pipes';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { QuizId, QuizAnswerId } from 'src/core/entities';
import { AddAnswersUseCase } from 'src/core/usecases/answers/add-answers.usecase';
import { DeleteAnswerUseCase } from 'src/core/usecases/answers/delete-answer.usecase';
import { GetQuizAnswersReportUseCase } from 'src/core/usecases/answers/get-answers-report.usecase';
import { ListAnswersUseCase } from 'src/core/usecases/answers/list-answers.usecase';
import { UpdateAnswerUseCase } from 'src/core/usecases/answers/update-answers.usecase';

import {
  CreateQuizUseCase,
  DeleteQuizUseCase,
  GetQuizByIdUseCase,
  ListAnsweredQuizzesUseCase,
  ListMyQuizzesUseCase,
  ListQuizzesToAnswerUseCase,
  ListQuizzesUseCase,
  UpdateQuizUseCase,
} from 'src/core/usecases/quiz';

import { User } from '../auth/jwt/decorators';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthenticatedUser } from '../auth/types';

import { PageResponse, PaginatedApiResponse } from '../shared';

import {
  AnswerQuizRequest,
  CreateQuizRequest,
  UpdateAnswerRequest,
} from './requests';
import {
  AnswerQuizResponse,
  MyQuizListResponse,
  QuizAnswerResponse,
  QuizListResponse,
  QuizResponse,
} from './responses';

@ApiTags('questionarios')
@ApiExtraModels(
  PageResponse,
  QuizListResponse,
  MyQuizListResponse,
  QuizAnswerResponse,
)
@Controller('questionarios')
export class QuizzesController {
  constructor(
    private readonly _createQuiz: CreateQuizUseCase,
    private readonly _listQuizzes: ListQuizzesUseCase,
    private readonly _deleteQuiz: DeleteQuizUseCase,
    private readonly _getQuizById: GetQuizByIdUseCase,
    private readonly _updateQuiz: UpdateQuizUseCase,
    private readonly _listQuizzesToAnswer: ListQuizzesToAnswerUseCase,
    private readonly _listAnsweredQuizzes: ListAnsweredQuizzesUseCase,
    private readonly _listMyQuizzes: ListMyQuizzesUseCase,
    private readonly _answerQuiz: AddAnswersUseCase,
    private readonly _deleteAnswer: DeleteAnswerUseCase,
    private readonly _updateAnswers: UpdateAnswerUseCase,
    private readonly _listAnswers: ListAnswersUseCase,
    private readonly _getQuizReport: GetQuizAnswersReportUseCase,
  ) {}

  @PaginatedApiResponse(QuizListResponse)
  @Get('/')
  list(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PageResponse<QuizListResponse>> {
    return this._listQuizzes.execute({ page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(QuizListResponse)
  @Get('/to-answer')
  listToAnswer(
    @User() { id }: AuthenticatedUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PageResponse<QuizListResponse>> {
    return this._listQuizzesToAnswer.execute({ userId: id, page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(QuizListResponse)
  @Get('/answered')
  listAnswered(
    @User() { id }: AuthenticatedUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PageResponse<QuizListResponse>> {
    return this._listAnsweredQuizzes.execute({ userId: id, page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(MyQuizListResponse)
  @Get('/my')
  listMy(
    @User() { id }: AuthenticatedUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return this._listMyQuizzes.execute({ userId: id, page, pageSize });
  }

  @ApiOkResponse({ type: QuizResponse })
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: QuizId) {
    return this._getQuizById.execute({ id });
  }

  @ApiOkResponse({ type: QuizResponse })
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: QuizId,
    @Body() request: CreateQuizRequest,
  ) {
    return this._updateQuiz.execute({ ...request, id });
  }

  @ApiNoContentResponse()
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: QuizId) {
    return this._deleteQuiz.execute({ id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: QuizResponse })
  @Post('/')
  register(
    @User() user: AuthenticatedUser,
    @Body() request: CreateQuizRequest,
  ) {
    return this._createQuiz.execute({ ...request, userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: AnswerQuizResponse,
    isArray: true,
  })
  @Post('/:id/respostas')
  answer(
    @User() user: AuthenticatedUser,
    @Param('id', ParseIntPipe) quizId: QuizId,
    @Body() request: AnswerQuizRequest,
  ) {
    return this._answerQuiz.execute({ quizId, userId: user.id, ...request });
  }

  @ApiOkResponse()
  @Put('/:id/respostas/:answerId')
  updateAnswer(
    @Param('answerId', ParseIntPipe) quizAnswerId: QuizId,
    @Body() request: UpdateAnswerRequest,
  ) {
    return this._updateAnswers.execute({
      answerId: request.answerId,
      quizAnswerId,
    });
  }

  @ApiNoContentResponse()
  @Delete('/:id/respostas/:answerId')
  deleteAnswer(@Param('answerId', ParseIntPipe) quizAnswerId: QuizAnswerId) {
    return this._deleteAnswer.execute({ quizAnswerId });
  }

  @PaginatedApiResponse(QuizAnswerResponse)
  @Get('/:id/respostas')
  listAnswers(
    @Param('id', ParseIntPipe) quizId: QuizId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PageResponse<any>> {
    return this._listAnswers.execute({ page, pageSize, quizId });
  }

  @Get('/:id/respostas/relatorio')
  getReport(@Param('id', ParseIntPipe) quizId: QuizId) {
    return this._getQuizReport.execute({ quizId });
  }
}
