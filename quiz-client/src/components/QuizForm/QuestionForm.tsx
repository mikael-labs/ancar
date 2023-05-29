import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getIn } from "formik";

import { AlternativeForm } from "./AlternativeForm";
import { createEmptyAnswer } from "./utils";
import { QuizForm } from "./types";
import { getIsInvalid } from "../../utils/formik";

type Props = {
  quizForm: QuizForm;
  index: number;
};

export const QuestionForm = ({ quizForm, index }: Props) => {
  const questions = quizForm.values.questions;
  const answers = quizForm.values.questions[index].answers;

  function handleAddAlternative() {
    quizForm.setFieldValue(`questions.${index}.answers`, [...answers, createEmptyAnswer()]);
  }

  function handleRemoveAlternative(id: number) {
    return () =>
      quizForm.setFieldValue(
        `questions.${index}.answers`,
        answers.filter((answer) => answer._id !== id)
      );
  }

  function handleRemoveQuestion() {
    quizForm.setFieldValue(
      `questions`,
      questions.filter((_, idx) => idx !== index)
    );
  }

  return (
    <Popover trigger="hover" placement="right-start">
      <PopoverTrigger>
        <Card className="shadow-md">
          <CardBody>
            <HStack justifyContent="space-between" className="mb-5 flex-wrap sm:flex-nowrap gap-3">
              <FormControl isInvalid={getIsInvalid(quizForm, `questions.${index}.description`)}>
                <Input
                  placeholder="Pergunta"
                  className="flex-auto"
                  value={quizForm.values.questions[index].description}
                  onChange={quizForm.handleChange}
                  onBlur={quizForm.handleBlur}
                  name={`questions.${index}.description`}
                  disabled={quizForm.isSubmitting}
                />
                <FormErrorMessage>{getIn(quizForm.errors, `questions.${index}.description`)}</FormErrorMessage>
              </FormControl>
            </HStack>

            <Stack className="gap-2">
              {answers.map((answer, answerIndex) => (
                <AlternativeForm
                  key={answer.id ?? answer._id}
                  onRemove={handleRemoveAlternative(answer._id)}
                  quizForm={quizForm}
                  questionIndex={index}
                  index={answerIndex}
                ></AlternativeForm>
              ))}
            </Stack>

            <Button
              type="button"
              className="w-full mt-5"
              variant="outline"
              onClick={handleAddAlternative}
              isDisabled={quizForm.isSubmitting}
            >
              Adicionar alternativa
            </Button>
          </CardBody>
        </Card>
      </PopoverTrigger>

      {questions.length > 1 && (
        <PopoverContent width={70}>
          <PopoverBody>
            <Stack>
              <IconButton
                variant="ghost"
                title="Clique para deletar a pergunta"
                aria-label="Clique para deletar a pergunta"
                onClick={handleRemoveQuestion}
                icon={<DeleteIcon />}
              />
            </Stack>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};
