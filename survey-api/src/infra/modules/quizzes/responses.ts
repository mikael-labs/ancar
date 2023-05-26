import { ApiProperty } from '@nestjs/swagger';
import { AnswerId, QuestionId, QuizId, QuizAnswerId } from 'src/core/entities';

export class QuizListResponse {
  @ApiProperty()
  id: QuizId;

  @ApiProperty()
  date: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  numberOfQuestions: number;
}

class AnswerResponse {
  @ApiProperty()
  id: AnswerId;

  @ApiProperty()
  description: string;
}

class QuestionResponse {
  @ApiProperty()
  id: QuestionId;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [AnswerResponse] })
  answers: AnswerResponse[];
}

export class QuizResponse {
  @ApiProperty()
  id: QuizId;

  @ApiProperty()
  date: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [QuestionResponse] })
  questions: QuestionResponse[];
}

export class MyQuizListResponse {
  @ApiProperty()
  id: QuizId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  numberOfAnswers: number;
}

class QuestionWithoutAnswersResponse {
  @ApiProperty()
  id: QuestionId;

  @ApiProperty()
  description: string;
}

export class AnswerQuizResponse {
  @ApiProperty()
  question: QuestionWithoutAnswersResponse;

  @ApiProperty()
  answer: AnswerResponse;
}

class QuizAnswerQuizResponse {
  @ApiProperty()
  id: QuizId;

  @ApiProperty()
  date: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class QuizAnswerResponse {
  @ApiProperty()
  id: QuizAnswerId;

  @ApiProperty()
  quiz: QuizAnswerQuizResponse;

  @ApiProperty()
  question: QuestionWithoutAnswersResponse;

  @ApiProperty()
  answer: AnswerResponse;
}

class AnswersReportAnswerResponse {
  @ApiProperty()
  id: AnswerId;

  @ApiProperty()
  description: string;

  @ApiProperty()
  timesSelected: number;
}

class AnswersReportQuestionResponse {
  @ApiProperty()
  id: QuestionId;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [AnswersReportAnswerResponse] })
  answers: AnswersReportAnswerResponse[];
}

export class AnswersReportResponse {
  @ApiProperty()
  id: QuizId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: number;

  @ApiProperty({ type: [AnswersReportQuestionResponse] })
  questions: AnswersReportQuestionResponse[];
}
