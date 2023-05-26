import { Box, Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { quizService } from "../../services/QuizService/QuizService";
import { DataContainer } from "../../components/DataContainer/DataContainer";
import { QuizFormSkeleton } from "../../components/QuizForm/QuizFormSkeleton";
import { BackButton } from "../../components/BackButton/BackButton";
import { QuestionReport } from "./QuestionReport";

export const QuizReport = () => {
  const { id } = useParams();

  if (!id) throw new Error("No quiz id provided for QuizReport");

  const intId = parseInt(id);

  const { data, isFetching, isError, refetch } = useQuery(["quizReport", intId], () =>
    quizService.getQuizReport(intId)
  );

  return (
    <Box className="m-auto">
      <DataContainer isLoading={isFetching} hasError={isError} onTryAgain={refetch} LoadingComponent={QuizFormSkeleton}>
        {data && (
          <Card width={800}>
            <CardHeader>
              <BackButton className="mb-5" />

              <Heading size="lg" className="mb-4" color="primary.dark">
                {data.name} - Quantidade de respostas
              </Heading>

              <Heading as="h2" size="md" className="!font-normal" color="primary.dark">
                {data.description}
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack className="gap-2">
                {data.questions.map((question) => (
                  <QuestionReport key={question.id} question={question} />
                ))}
              </Stack>
            </CardBody>
          </Card>
        )}
      </DataContainer>
    </Box>
  );
};
