export type AnswerId = number;

export type AnswerProps = {
  id?: AnswerId;
  description: string;
};

export class Answer {
  id: AnswerId;
  description: string;

  constructor({ id, description }: AnswerProps) {
    if (id) this.id = id;
    this.description = description;
  }
}
