import { useMemo } from "react";
import { Box, Card, CardBody, CardHeader, HStack, Radio, Stack, Text, Tooltip } from "@chakra-ui/react";

import { QuizReportQuestion, QuizReportQuestionAnswer } from "../../services/QuizService/responses";

type Props = {
  question: QuizReportQuestion;
};

export const QuestionReport = ({ question }: Props) => {
  const answersTotal = useMemo(
    () => question.answers.reduce((acc, answer) => acc + answer.timesSelected, 0),
    [question]
  );

  function calculateAnswerPercentage(answer: QuizReportQuestionAnswer) {
    return (answer.timesSelected * 100) / answersTotal;
  }

  return (
    <Card>
      <CardHeader>{question.description}</CardHeader>
      <CardBody>
        <Stack>
          {question.answers.map((answer) => (
            <HStack key={answer.id} className="gap-2 h-16 items-center">
              <Radio isDisabled />

              <Tooltip label={answer.description}>
                <Box
                  bg="primary.default"
                  width={`${calculateAnswerPercentage(answer)}%`}
                  minWidth={100}
                  className={`pl-2 h-full flex items-center justify-end rounded-tr-md rounded-br-md cursor-pointer pr-2 hover:cursor-pointer hover:scale-105`}
                >
                  <Text color="white">
                    {answer.timesSelected} ({calculateAnswerPercentage(answer).toFixed(2)}%)
                  </Text>
                </Box>
              </Tooltip>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
