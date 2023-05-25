import { ApiProperty } from '@nestjs/swagger';
import { AnswerId, QuestionId, QuizId } from 'src/core/entities';

export class CreateAnswerRequest {
  @ApiProperty()
  description: string;
}

export class CreateQuestionRequest {
  @ApiProperty()
  description: string;

  @ApiProperty({ type: [CreateAnswerRequest] })
  answers: CreateAnswerRequest[];
}

export class CreateQuizRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [CreateQuestionRequest] })
  questions: CreateQuestionRequest[];
}

export class AnswerQuizRequestAnswer {
  @ApiProperty()
  questionId: QuestionId;

  @ApiProperty()
  answerId: AnswerId;
}

export class AnswerQuizRequest {
  @ApiProperty({ type: AnswerQuizRequestAnswer })
  answers: AnswerQuizRequestAnswer[];
}

export class UpdateAnswerRequest {
  @ApiProperty()
  answerId: AnswerId;
}
