import { useParams } from "react-router-dom";
import { quizService } from "../../services/QuizService/QuizService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Card, CardBody, useToast } from "@chakra-ui/react";
import { QuizForm } from "../../components/QuizForm/QuizForm";
import { useMemo } from "react";
import { QuizFormValue } from "../../components/QuizForm/types";
import { QuizFormSkeleton } from "../../components/QuizForm/QuizFormSkeleton";
import { ErrorComponent } from "../../components/Error/Error";

export const EditQuiz = () => {
  const { id } = useParams();
  const toast = useToast();

  if (!id) throw Error();

  const intId = parseInt(id);

  const { data, isLoading, isError, refetch } = useQuery(["getQuizById", id], () => quizService.getQuizById(intId));

  const initialValues: QuizFormValue | null = useMemo(() => {
    if (!data) return null;

    return {
      ...data,
      questions: data.questions.map((question) => ({
        ...question,
        _id: question.id,
        answers: question.answers.map((answer) => ({ ...answer, _id: answer.id })),
      })),
    };
  }, [data]);

  const updateQuizMutation = useMutation({
    mutationFn: (formValue: QuizFormValue) => {
      return quizService
        .updateQuiz({ id: intId, ...formValue })
        .then(() => toast({ title: "Quiz editado com sucesso!", status: "success" }));
    },
  });

  return (
    <Box className="m-auto">
      {isLoading && <QuizFormSkeleton />}

      {!!initialValues && <QuizForm initialValues={initialValues} onSubmit={updateQuizMutation.mutateAsync} />}

      {isError && (
        <Card>
          <CardBody>
            <ErrorComponent onTryAgain={refetch} />
          </CardBody>
        </Card>
      )}
    </Box>
  );
};
