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

import { QuizId } from 'src/core/entities';

import {
  AnswerQuizUseCase,
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

import {
  ListPaginatedRequest,
  PageResponse,
  PaginatedApiResponse,
} from '../shared';

import { AnswerQuizRequest, CreateQuizRequest } from './requests';
import {
  MyQuizListResponse,
  QuizListResponse,
  QuizResponse,
} from './responses';

@ApiTags('quizzes')
@ApiExtraModels(PageResponse, QuizListResponse, MyQuizListResponse)
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly createQuiz: CreateQuizUseCase,
    private readonly listQuizzes: ListQuizzesUseCase,
    private readonly deleteQuiz: DeleteQuizUseCase,
    private readonly getQuizById: GetQuizByIdUseCase,
    private readonly updateQuiz: UpdateQuizUseCase,
    private readonly answerQuiz: AnswerQuizUseCase,
    private readonly listQuizzesToAnswer: ListQuizzesToAnswerUseCase,
    private readonly listAnsweredQuizzes: ListAnsweredQuizzesUseCase,
    private readonly listMyQuizzes: ListMyQuizzesUseCase,
  ) {}

  @PaginatedApiResponse(QuizListResponse)
  @Get('/')
  list(
    @Query() { page = 1, pageSize = 10 }: ListPaginatedRequest,
  ): Promise<PageResponse<QuizListResponse>> {
    return this.listQuizzes.execute({ page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(QuizListResponse)
  @Get('/to-answer')
  listToAnswer(
    @User() { id }: AuthenticatedUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PageResponse<QuizListResponse>> {
    return this.listQuizzesToAnswer.execute({ userId: id, page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(QuizListResponse)
  @Get('/answered')
  listAnswered(
    @User() { id }: AuthenticatedUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PageResponse<QuizListResponse>> {
    return this.listAnsweredQuizzes.execute({ userId: id, page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(MyQuizListResponse)
  @Get('/my')
  listMy(
    @User() { id }: AuthenticatedUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return this.listMyQuizzes.execute({ userId: id, page, pageSize });
  }

  @ApiOkResponse({ type: QuizResponse })
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: QuizId) {
    return this.getQuizById.execute({ id });
  }

  @ApiOkResponse({ type: QuizResponse })
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: QuizId,
    @Body() request: CreateQuizRequest,
  ) {
    return this.updateQuiz.execute({ ...request, id });
  }

  @ApiNoContentResponse()
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: QuizId) {
    return this.deleteQuiz.execute({ id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: QuizResponse })
  @Post('/')
  register(
    @User() user: AuthenticatedUser,
    @Body() request: CreateQuizRequest,
  ) {
    return this.createQuiz.execute({ ...request, userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Post('/:id/answer')
  answer(
    @User() user: AuthenticatedUser,
    @Param('id', ParseIntPipe) quizId: QuizId,
    @Body() request: AnswerQuizRequest,
  ) {
    return this.answerQuiz.execute({ quizId, userId: user.id, ...request });
  }
}
