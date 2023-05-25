import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmptyQuestion } from "./utils";
import { QuizFormValue } from "./types";

const quizValidationSchema = Yup.object().shape({
  name: Yup.string().required("Por favor, informe o título do questionário"),
  description: Yup.string().required("Por favor, informe a descrição do questionário"),
  questions: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required("Por favor, informe a pergunta"),
      answers: Yup.array().of(
        Yup.object().shape({
          description: Yup.string().required("Por favor, informe a alternativa"),
        })
      ),
    })
  ),
});

export type UseQuizFormProps = {
  initialValues?: QuizFormValue;
  onSubmit: (value: QuizFormValue) => any;
};

export const useQuizForm = ({ onSubmit, initialValues }: UseQuizFormProps) => {
  const quizForm = useFormik<QuizFormValue>({
    validationSchema: quizValidationSchema,
    initialValues: initialValues ?? {
      description: "",
      name: "",
      questions: [createEmptyQuestion()],
    },
    onSubmit,
  });

  return { quizForm };
};
