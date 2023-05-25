export type GetQuizzesRequest = {
  page: number;
  pageSize: number;
};

export type CreateQuizRequestQuestionAnswer = {
  id?: number;
  description: string;
};

export type CreateQuizRequestQuestion = {
  id?: number;
  description: string;
  answers: CreateQuizRequestQuestionAnswer[];
};

export type CreateQuizRequest = {
  name: string;
  description: string;
  questions: CreateQuizRequestQuestion[];
};

export type UpdateQuizRequest = CreateQuizRequest & { id: number };

export type AnswerQuizRequest = {
  quizId: number;
  answers: { questionId: number; answerId: number }[];
};
