import { useMemo } from "react";
import { Box, Card, CardBody, CardHeader, HStack, Radio, Stack, Text, Tooltip } from "@chakra-ui/react";

import { QuizReportQuestion, QuizReportQuestionAnswer } from "../../services/QuizService/responses";
import { AnswerReport } from "./AnswerReport";

type Props = {
  question: QuizReportQuestion;
};

export const QuestionReport = ({ question }: Props) => {
  const answersTotal = useMemo(
    () => question.answers.reduce((acc, answer) => acc + answer.timesSelected, 0),
    [question]
  );

  function calculateAnswerPercentage(answer: QuizReportQuestionAnswer) {
    return (answer.timesSelected * 100) / answersTotal || 0;
  }

  return (
    <Card>
      <CardHeader>{question.description}</CardHeader>
      <CardBody>
        <Stack>
          {question.answers.map((answer) => (
            <AnswerReport key={answer.id} answer={answer} percentage={calculateAnswerPercentage(answer)} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
