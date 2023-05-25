import { Question } from './question';
import { User } from './user';

export type QuizId = number;

export type QuizProps = {
  id?: QuizId;
  date: number;
  name: string;
  description: string;
  questions: Question[];
  user: User;
};

export class Quiz {
  id: QuizId;
  date: number;
  name: string;
  description: string;
  questions: Question[];
  user: User;

  constructor({ id, date, name, description, questions, user }: QuizProps) {
    if (id) this.id = id;
    this.date = date;
    this.name = name;
    this.description = description;
    this.questions = questions;
    this.user = user;
  }
}
