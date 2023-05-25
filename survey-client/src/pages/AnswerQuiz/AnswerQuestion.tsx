import { Card, CardBody, CardHeader, FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Question } from "../../services/QuizService/responses";
import { getIsInvalid } from "../../utils/formik";
import { getIn } from "formik";
import { AnswerQuizForm } from "./types";

type Props = {
  question: Question;
  answerQuizForm: AnswerQuizForm;
  index: number;
};

export const AnswerQuestion = ({ question, answerQuizForm, index }: Props) => {
  function handleAnswerChanged(value: string) {
    answerQuizForm.setFieldValue(`answers.${index}.answerId`, parseInt(value));
  }

  const answerValue = answerQuizForm.values.answers[index]?.answerId.toString();

  return (
    <Card key={question.id}>
      <CardHeader>{question.description}</CardHeader>
      <CardBody>
        <FormControl
          isInvalid={getIsInvalid(answerQuizForm, `answers.${index}.answerId`)}
          isDisabled={answerQuizForm.isSubmitting}
        >
          <RadioGroup name={`answers.${index}.answerId`} value={answerValue} onChange={handleAnswerChanged}>
            <Stack>
              {question.answers.map((answer) => (
                <Radio key={answer.id} value={answer.id.toString()}>
                  {answer.description}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <FormErrorMessage>{getIn(answerQuizForm.errors, `answers.${index}.answerId`)}</FormErrorMessage>
        </FormControl>
      </CardBody>
    </Card>
  );
};
