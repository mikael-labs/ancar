import { ApiProperty } from '@nestjs/swagger';

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
