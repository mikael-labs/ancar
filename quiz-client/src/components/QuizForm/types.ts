import { useQuizForm } from "./useQuizForm";

export type QuizFormValue = {
  name: string;
  description: string;
  questions: {
    id?: number;
    _id: number;
    description: string;
    answers: {
      id?: number;
      _id: number;
      description: string;
    }[];
  }[];
};

export type QuizForm = ReturnType<typeof useQuizForm>["quizForm"];
