import { Quiz } from './quiz';
import { User } from './user';
import { QuizAnswer } from './quiz-answer';

export type UserQuizId = number;

export type UserQuizProps = {
  id?: UserQuizId;
  user: User;
  quiz: Quiz;
  answers: QuizAnswer[];
};

export class UserQuizAnswer {
  id?: UserQuizId;
  user: User;
  quiz: Quiz;
  answers: QuizAnswer[];

  constructor({ id, user, quiz, answers }: UserQuizProps) {
    this.id = id;
    this.user = user;
    this.quiz = quiz;
    this.answers = answers;
  }
}
