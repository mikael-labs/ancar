import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";

import { quizService } from "../../../services/QuizService/QuizService";
import { QuizzesTableSkeleton } from "../QuizzesTableSkeleton";
import { Pagination } from "../../../components/Pagination";
import { MyQuizzesTable } from "./MyQuizzesTable";
import { DataContainer } from "../../../components/DataContainer/DataContainer";
import { NoContent } from "../../../components/NoContent/NoContent";
import { MyQuizListItem } from "../../../services/QuizService/responses";

export const MyQuizzes = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isFetching, refetch } = useQuery(["getMyQuizzes", page], () =>
    quizService.getMyQuizzes({ page, pageSize: 10 })
  );

  const removeQuizMutation = useMutation({
    mutationFn: (quiz: MyQuizListItem) => quizService.deleteQuiz(quiz.id).then(() => refetch()),
  });

  const hasQuizzes = !!data && data.items.length > 0;

  return (
    <DataContainer
      isLoading={isFetching || removeQuizMutation.isLoading}
      hasError={isError}
      LoadingComponent={QuizzesTableSkeleton}
      onTryAgain={refetch}
      hasData={hasQuizzes}
      NoContentComponent={<NoContent message="Nenhum questionário encontrado" />}
    >
      {data && (
        <>
          <MyQuizzesTable quizzes={data.items} onRemoveQuiz={removeQuizMutation.mutate} />

          <Box className="flex justify-center items-center mt-3 overflow-auto">
            <Pagination totalPages={data.totalPages} page={page} onChange={(e) => setPage(e)} />
          </Box>
        </>
      )}
    </DataContainer>
  );
};
