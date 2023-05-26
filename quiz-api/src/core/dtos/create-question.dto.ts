export type CreateAnswerDTO = {
  description: string;
};

export type CreateQuestionDTO = {
  description: string;
  answers: CreateAnswerDTO[];
};
