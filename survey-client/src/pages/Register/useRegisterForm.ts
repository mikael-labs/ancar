import { useFormik } from "formik";
import * as Yup from "yup";
import { isCpfValid } from "../../utils/cpf";

export type RegisterFormValue = {
  CPF: string;
  name: string;
  password: string;
};

type UseRegisterFormProps = {
  onSubmit: (formValue: any) => void;
};

const validationSchema = Yup.object().shape({
  CPF: Yup.string().required("Por favor, informe seu CPF").test({
    test: isCpfValid,
    message: "Por favor, informe um CPF válido",
  }),
  name: Yup.string().required("Por favor, informe seu nome"),
  password: Yup.string().required("Por favor, informe sua senha"),
});

export const useRegisterForm = ({ onSubmit }: UseRegisterFormProps) => {
  const registerForm = useFormik<RegisterFormValue>({
    validationSchema,
    initialValues: {
      CPF: "",
      name: "",
      password: "",
    },
    onSubmit,
  });

  return { registerForm };
};
