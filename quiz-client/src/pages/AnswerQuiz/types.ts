import { useAnswerQuizForm } from "./useAnswerQuizForm";

export type AnswerQuizFormValue = {
  quizId: number;
  answers: { questionId: number; answerId: number }[];
};

export type UseAnswerQuizFormProps = {
  onSubmit: (value: AnswerQuizFormValue) => any;
  initialValues: AnswerQuizFormValue;
  enableReinitialize?: boolean;
};

export type AnswerQuizForm = ReturnType<typeof useAnswerQuizForm>["answerQuizForm"];
