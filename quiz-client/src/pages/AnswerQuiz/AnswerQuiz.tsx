import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { quizService } from "../../services/QuizService/QuizService";
import { Box, Button, Card, CardBody, CardHeader, HStack, Heading, Spinner, Stack, useToast } from "@chakra-ui/react";
import { useAnswerQuizForm } from "./useAnswerQuizForm";
import { AnswerQuestion } from "./AnswerQuestion";
import { AnswerQuizFormValue } from "./types";
import { BackButton } from "../../components/BackButton/BackButton";
import { DataContainer } from "../../components/DataContainer/DataContainer";
import { QuizFormSkeleton } from "../../components/QuizForm/QuizFormSkeleton";
import { ErrorCard } from "../../components/Error/ErrorCard";

export const AnswerQuiz = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  if (!id) throw new Error("No id provided for AnswerQuiz");

  const intId = parseInt(id);

  const { data, isFetching, isError, refetch } = useQuery(["getQuizById", intId], () => quizService.getQuizById(intId));

  const questions = useMemo(() => (data ? data.questions : null), [data]);

  const initialValues = useMemo(
    () => ({
      quizId: intId,
      answers: questions?.map((question) => ({ questionId: question.id, answerId: question.answers[0].id })) ?? [],
    }),
    [questions, intId]
  );

  const answerQuizMutation = useMutation({
    mutationFn: (formValue: AnswerQuizFormValue) => {
      return quizService.answerQuiz(formValue).then(() => {
        toast({ title: "Questionário respondido com sucesso!", status: "success" });
        navigate("/quizzes");
      });
    },
  });

  const { answerQuizForm } = useAnswerQuizForm({
    onSubmit: answerQuizMutation.mutateAsync,
    initialValues,
    enableReinitialize: true,
  });

  return (
    <Box className="m-auto">
      <DataContainer
        isLoading={isFetching}
        hasError={isError}
        LoadingComponent={QuizFormSkeleton}
        onTryAgain={refetch}
        ErrorComponent={ErrorCard}
      >
        {data && questions && (
          <Card width={800}>
            <CardHeader>
              <BackButton className="mb-5" isDisabled={answerQuizForm.isSubmitting} />

              <Heading size="lg" className="mb-4" color="primary.dark">
                {data.name}
              </Heading>

              <Heading as="h2" size="md" className="!font-normal" color="primary.dark">
                {data.description}
              </Heading>
            </CardHeader>

            <CardBody>
              <form onSubmit={answerQuizForm.handleSubmit} noValidate>
                <Stack className="gap-2">
                  {questions.map((question, questionIndex) => (
                    <AnswerQuestion
                      key={question.id}
                      index={questionIndex}
                      question={question}
                      answerQuizForm={answerQuizForm}
                    />
                  ))}
                </Stack>

                <HStack justifyContent="flex-end">
                  <Button type="submit" className="mt-5" isDisabled={answerQuizForm.isSubmitting}>
                    Submeter {answerQuizForm.isSubmitting && <Spinner size="sm" className="ml-2" />}
                  </Button>
                </HStack>
              </form>
            </CardBody>
          </Card>
        )}
      </DataContainer>
    </Box>
  );
};
