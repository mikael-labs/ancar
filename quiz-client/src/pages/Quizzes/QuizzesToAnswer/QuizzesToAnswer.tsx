import { useQuery } from "@tanstack/react-query";
import { QuizzesTable } from "./QuizzesToAnswerTable";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { QuizzesTableSkeleton } from "../QuizzesTableSkeleton";
import { Pagination } from "../../../components/Pagination";
import { quizService } from "../../../services/QuizService/QuizService";
import { DataContainer } from "../../../components/DataContainer/DataContainer";
import { NoContent } from "../../../components/NoContent/NoContent";

export const QuizzesToAnswer = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isFetching, refetch } = useQuery(["quizzesToAnswer", page], () =>
    quizService.getQuizzes({ page, pageSize: 10 })
  );

  const hasQuizzes = !!data && data.items.length > 0;

  return (
    <DataContainer
      isLoading={isFetching}
      hasError={isError}
      LoadingComponent={QuizzesTableSkeleton}
      onTryAgain={refetch}
      hasData={hasQuizzes}
      NoContentComponent={<NoContent message="Nenhum questionário encontrado" />}
    >
      {data && (
        <>
          <QuizzesTable quizzes={data.items} />

          <Box className="flex justify-center items-center mt-3 overflow-auto">
            <Pagination totalPages={data.totalPages} page={page} onChange={(e) => setPage(e)} />
          </Box>
        </>
      )}
    </DataContainer>
  );
};
