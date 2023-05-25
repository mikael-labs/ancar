import { useFormik } from "formik";
import * as Yup from "yup";

export type LoginFormValue = {
  CPF: string;
  password: string;
};

type UseLoginFormProps = {
  onSubmit: (value: LoginFormValue) => any;
};

export const useLoginForm = ({ onSubmit }: UseLoginFormProps) => {
  const validationSchema = Yup.object().shape({
    CPF: Yup.string().required("Por favor, informe seu CPF"),
    password: Yup.string().required("Por favor, informe sua senha"),
  });

  const loginForm = useFormik({
    validationSchema,
    initialValues: {
      CPF: "",
      password: "",
    },
    onSubmit,
  });

  return { loginForm };
};
