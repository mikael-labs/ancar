import { Box, HStack, Radio, Text, Tooltip } from "@chakra-ui/react";

import { QuizReportQuestionAnswer } from "../../services/QuizService/responses";

type Props = {
  answer: QuizReportQuestionAnswer;
  percentage: number;
};

export const AnswerReport = ({ answer, percentage }: Props) => {
  const width = percentage ? `${percentage}%` : undefined;
  const minWidth = percentage ? 100 : undefined;
  const background = percentage ? "primary.default" : "gray.200";
  const textColor = percentage ? "white" : "primary.dark";

  return (
    <HStack key={answer.id} className="gap-2 h-16 items-center">
      <Radio isDisabled />

      <Tooltip label={answer.description}>
        <Box
          bg={background}
          width={width}
          minWidth={minWidth}
          className={`pl-2 h-full flex items-center justify-end rounded-tr-md rounded-br-md cursor-pointer pr-2 hover:cursor-pointer hover:scale-105`}
        >
          <Text color={textColor}>
            {answer.timesSelected} <Text className="inline ml-2 font-semibold">({percentage.toFixed(2)}%)</Text>
          </Text>
        </Box>
      </Tooltip>
    </HStack>
  );
};
