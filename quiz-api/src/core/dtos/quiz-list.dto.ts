import { QuizId } from '../entities';

export type QuizListDTO = {
  id: QuizId;
  date: number;
  name: string;
  description: string;
  numberOfQuestions: number;
};
