import { Quiz, QuizId } from '../entities/quiz';
import { QuestionDTO } from './question.dto';

export class QuizDTO {
  id: QuizId;
  date: number;
  name: string;
  description: string;
  questions: QuestionDTO[];

  static fromDomain(quiz: Quiz): QuizDTO {
    const dto = new QuizDTO();
    dto.id = quiz.id;
    dto.name = quiz.name;
    dto.date = quiz.date;
    dto.description = quiz.description;
    dto.questions = quiz.questions;

    return dto;
  }
}
