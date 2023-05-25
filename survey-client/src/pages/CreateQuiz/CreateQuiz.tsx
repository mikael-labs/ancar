import { quizService } from "../../services/QuizService/QuizService";
import { QuizForm } from "../../components/QuizForm/QuizForm";
import { QuizFormValue } from "../../components/QuizForm/types";
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const CreateQuiz = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const createQuizMutation = useMutation({
    mutationFn: (formValue: QuizFormValue) => {
      return quizService.createQuiz(formValue).then(() => {
        toast({ title: "Questionário criado com sucesso!", status: "success" });
        navigate("/quizzes");
      });
    },
  });

  return (
    <Box className="m-auto">
      <QuizForm onSubmit={createQuizMutation.mutateAsync} />
    </Box>
  );
};
