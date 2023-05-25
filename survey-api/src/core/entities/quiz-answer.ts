import { Answer } from './answer';
import { Question } from './question';

export type QuizAnswerId = number;

export type QuizAnswerProps = {
  id?: QuizAnswerId;
  question: Question;
  answer: Answer;
};

export class QuizAnswer {
  id: QuizAnswerId;
  question: Question;
  answer: Answer;

  constructor({ id, question, answer }: QuizAnswerProps) {
    if (id) this.id = id;
    this.question = question;
    this.answer = answer;
  }
}
