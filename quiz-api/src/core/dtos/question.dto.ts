import { AnswerId } from '../entities';
import { QuestionId } from '../entities/question';

export type QuestionDTO = {
  id: QuestionId;
  description: string;
  answers: { id: AnswerId; description: string }[];
};
