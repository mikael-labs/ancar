import { Quiz } from './quiz';
import { User } from './user';
import { Question } from './question';
import { Answer } from './answer';

export type QuizAnswerId = number;

export type QuizAnswerProps = {
  id?: QuizAnswerId;
  user: User;
  quiz: Quiz;
  question: Question;
  answer: Answer;
};

export class QuizAnswer {
  id: QuizAnswerId;
  user: User;
  quiz: Quiz;
  question: Question;
  answer: Answer;

  constructor({ id, user, quiz, question, answer }: QuizAnswerProps) {
    if (id) this.id = id;
    this.user = user;
    this.quiz = quiz;
    this.question = question;
    this.answer = answer;
  }
}
