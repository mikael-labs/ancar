import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { getIn } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { LoginFormValue, useLoginForm } from "./useLoginForm";
import { getIsInvalid } from "../../utils/formik";
import { authService } from "../../services/AuthService/AuthService";

export const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (formValue: LoginFormValue) => {
      return authService.login(formValue).then(({ token }) => {
        sessionStorage.setItem("ancar:access-token", token);
        navigate("/quizzes");
      });
    },
  });

  const { loginForm } = useLoginForm({ onSubmit: loginMutation.mutateAsync });

  return (
    <Box className="m-auto">
      <Card width={600}>
        <CardHeader display="flex" justifyContent="center" alignItems="center">
          <Heading color="primary.default" size="xl">
            Quizzy
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={loginForm.handleSubmit} noValidate>
            <FormControl
              className="mb-3"
              isInvalid={getIsInvalid(loginForm, "CPF")}
              isDisabled={loginForm.isSubmitting}
            >
              <Input
                ringColor="primary.default"
                placeholder="CPF"
                type="text"
                name="CPF"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <FormErrorMessage>{getIn(loginForm.errors, "CPF")}</FormErrorMessage>
            </FormControl>

            <FormControl
              className="mb-5"
              isInvalid={getIsInvalid(loginForm, "password")}
              isDisabled={loginForm.isSubmitting}
            >
              <Input
                ringColor="primary.default"
                placeholder="Senha"
                type="password"
                name="password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <FormErrorMessage>{getIn(loginForm.errors, "password")}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              variant="outline"
              colorScheme="primary"
              className="w-full"
              isDisabled={loginForm.isSubmitting}
            >
              Entrar {loginForm.isSubmitting && <Spinner size="sm" className="ml-2" />}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};
