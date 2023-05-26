import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/AuthService/AuthService";
import { RegisterFormValue, useRegisterForm } from "./useRegisterForm";
import { getHelpers, getIsInvalid } from "../../utils/formik";
import { getIn } from "formik";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/BackButton/BackButton";

export const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const registerMutation = useMutation({
    mutationFn: (request: RegisterFormValue) => {
      return authService.register(request).then(() => {
        toast({ title: "Cadastro realizado com sucesso!", status: "success" });
        navigate("/");
      });
    },
  });

  const { registerForm } = useRegisterForm({
    onSubmit: registerMutation.mutateAsync,
  });

  return (
    <Card width={600} className="m-auto">
      <CardHeader>
        <BackButton className="mb-3" isDisabled={registerForm.isSubmitting} />
        <Heading>Cadastre-se</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={registerForm.handleSubmit} noValidate>
          <Stack className="gap-3">
            <FormControl isDisabled={registerForm.isSubmitting} isInvalid={getIsInvalid(registerForm, "CPF")}>
              <Input type="text" placeholder="CPF" {...getHelpers(registerForm, "CPF")} />
              <FormErrorMessage>{getIn(registerForm.errors, "CPF")}</FormErrorMessage>
            </FormControl>
            <FormControl isDisabled={registerForm.isSubmitting} isInvalid={getIsInvalid(registerForm, "name")}>
              <Input type="text" placeholder="Nome" {...getHelpers(registerForm, "name")} />
              <FormErrorMessage>{getIn(registerForm.errors, "name")}</FormErrorMessage>
            </FormControl>
            <FormControl isDisabled={registerForm.isSubmitting} isInvalid={getIsInvalid(registerForm, "password")}>
              <Input type="password" placeholder="Senha" {...getHelpers(registerForm, "password")} />
              <FormErrorMessage>{getIn(registerForm.errors, "password")}</FormErrorMessage>
            </FormControl>
          </Stack>

          <Button type="submit" className="mt-5 w-full" isDisabled={registerForm.isSubmitting}>
            Registrar-se {registerForm.isSubmitting && <Spinner className="ml-2" />}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
