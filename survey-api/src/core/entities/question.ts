import { Answer } from './answer';

export type QuestionId = number;

export type QuestionProps = {
  id?: QuestionId;
  description: string;
  answers: Answer[];
};

export class Question {
  id: QuestionId;
  description: string;
  answers: Answer[];

  constructor({ id, description, answers }: QuestionProps) {
    if (id) this.id = id;
    this.description = description;
    this.answers = answers;

    if (answers.length === 0)
      throw new Error('Uma pergunta precisa possuir pelo menos uma resposta.');
  }
}
