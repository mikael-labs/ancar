import { useFormik } from "formik";
import * as Yup from "yup";

import { AnswerQuizFormValue, UseAnswerQuizFormProps } from "./types";

export const useAnswerQuizForm = ({ onSubmit, initialValues, enableReinitialize = false }: UseAnswerQuizFormProps) => {
  const validationSchema = Yup.object().shape({
    quizId: Yup.number().required(),
    answers: Yup.array().of(
      Yup.object().shape({
        questionId: Yup.number().required(),
        answerId: Yup.number().required("Por favor, informe a resposta para a pergunta"),
      })
    ),
  });

  const answerQuizForm = useFormik<AnswerQuizFormValue>({
    validationSchema,
    initialValues,
    enableReinitialize,
    onSubmit,
  });

  return { answerQuizForm };
};
