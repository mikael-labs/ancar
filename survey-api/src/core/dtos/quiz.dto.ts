import { QuizId } from '../entities/quiz';
import { QuestionDTO } from './question.dto';

export type QuizDTO = {
  id: QuizId;
  date: number;
  name: string;
  description: string;
  questions: QuestionDTO[];
};
