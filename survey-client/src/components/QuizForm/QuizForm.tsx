import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { QuestionForm } from "./QuestionForm";
import { useQuizForm } from "./useQuizForm";
import { createEmptyQuestion } from "./utils";
import { QuizFormValue } from "./types";
import { BackButton } from "../BackButton/BackButton";

export type Props = {
  initialValues?: QuizFormValue;
  onSubmit: (formValue: QuizFormValue) => any;
};

export const QuizForm = ({ onSubmit, initialValues }: Props) => {
  const { quizForm } = useQuizForm({ onSubmit, initialValues });

  const questions = quizForm.values.questions;

  function handleAddQuestion() {
    quizForm.setValues({
      ...quizForm.values,
      questions: [...questions, createEmptyQuestion()],
    });
  }

  return (
    <Card width={800}>
      <form onSubmit={quizForm.handleSubmit} noValidate>
        <CardHeader>
          <BackButton className="mb-5" />

          <FormControl isInvalid={!!quizForm.errors["name"]} isDisabled={quizForm.isSubmitting}>
            <Input
              placeholder="Título do questionário"
              variant="filled"
              size="lg"
              name="name"
              value={quizForm.values.name}
              onChange={quizForm.handleChange}
              onBlur={quizForm.handleBlur}
            />
            <FormErrorMessage>{quizForm.errors["name"]}</FormErrorMessage>
          </FormControl>
        </CardHeader>

        <CardBody>
          <FormControl isInvalid={!!quizForm.errors["description"]} className="mb-5" isDisabled={quizForm.isSubmitting}>
            <Textarea
              placeholder="Descrição"
              name="description"
              value={quizForm.values.description}
              onChange={quizForm.handleChange}
              onBlur={quizForm.handleBlur}
            />
            <FormErrorMessage>{quizForm.errors["description"]}</FormErrorMessage>
          </FormControl>

          <Box className="flex flex-col gap-3">
            <HStack className="mb-5" justifyContent="space-between" alignItems="center">
              <Heading fontSize="lg">Perguntas</Heading>

              <Button type="button" onClick={handleAddQuestion} isDisabled={quizForm.isSubmitting}>
                Adicionar
              </Button>
            </HStack>

            {questions.map((question, index) => (
              <QuestionForm key={question.id ?? question._id} quizForm={quizForm} index={index} />
            ))}

            <Button type="submit" className="mt-5" isDisabled={quizForm.isSubmitting}>
              {initialValues ? "Salvar" : "Criar Questionário"}
              {quizForm.isSubmitting && <Spinner size="sm" className="ml-2" />}
            </Button>
          </Box>
        </CardBody>
      </form>
    </Card>
  );
};
