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
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizId } from 'src/core/entities/quiz';
import { AnswerQuizUseCase } from 'src/core/usecases/quiz/answer-quiz.usecase';
import { CreateQuizUseCase } from 'src/core/usecases/quiz/create-quiz.usecase';
import { DeleteQuizUseCase } from 'src/core/usecases/quiz/delete-quiz.usecase';
import { GetQuizByIdUseCase } from 'src/core/usecases/quiz/get-quiz-by-id.usecase';
import { ListAnsweredQuizzesUseCase } from 'src/core/usecases/quiz/list-answered-quizes.usecase';
import { ListMyQuizzesUseCase } from 'src/core/usecases/quiz/list-my-quizzes.usecase';
import { ListQuizzesToAnswerUseCase } from 'src/core/usecases/quiz/list-quizzes-to-answer.usecase';
import { ListQuizzesUseCase } from 'src/core/usecases/quiz/list-quizzes.usercase';
import { UpdateQuizUseCase } from 'src/core/usecases/quiz/update-quiz.usecase';
import { User } from '../auth/jwt/decorators';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthenticatedUser } from '../auth/types';
import { ListPaginatedRequest } from '../shared/requests';
import { PageResponse } from '../shared/responses';
import { PaginatedApiResponse } from '../shared/utils';
import { CreateQuizRequest } from './requests';
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
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ): Promise<PageResponse<QuizListResponse>> {
    return this.listQuizzesToAnswer.execute({ userId: id, page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(QuizListResponse)
  @Get('/answered')
  listAnswered(
    @User() { id }: AuthenticatedUser,
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ): Promise<PageResponse<QuizListResponse>> {
    return this.listAnsweredQuizzes.execute({ userId: id, page, pageSize });
  }

  @UseGuards(JwtAuthGuard)
  @PaginatedApiResponse(MyQuizListResponse)
  @Get('/my')
  listMy(
    @User() { id }: AuthenticatedUser,
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
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
  update(@Param('id', ParseIntPipe) id: QuizId, @Body() request: any) {
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
    @Body() request: any,
  ) {
    return this.answerQuiz.execute({ quizId, userId: user.id, ...request });
  }
}
