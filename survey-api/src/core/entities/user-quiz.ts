import { Quiz } from './quiz';
import { User } from './user';
import { Question } from './question';
import { Answer } from './answer';

export type UserQuizAnswerId = number;

export type UserQuizProps = {
  id?: UserQuizAnswerId;
  user: User;
  quiz: Quiz;
  question: Question;
  answer: Answer;
};

export class UserQuizAnswer {
  id: UserQuizAnswerId;
  user: User;
  quiz: Quiz;
  question: Question;
  answer: Answer;

  constructor({ id, user, quiz, question, answer }: UserQuizProps) {
    if (id) this.id = id;
    this.user = user;
    this.quiz = quiz;
    this.question = question;
    this.answer = answer;
  }
}
