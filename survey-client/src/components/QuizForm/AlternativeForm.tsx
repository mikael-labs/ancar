import { Box, FormControl, FormErrorMessage, HStack, IconButton, Input, Radio } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { getIn } from "formik";

import { QuizForm } from "./types";
import { getIsInvalid } from "../../utils/formik";

type Props = {
  onRemove?: () => void;
  quizForm: QuizForm;
  questionIndex: number;
  index: number;
};

export const AlternativeForm = ({ onRemove, quizForm, questionIndex, index }: Props) => {
  const answers = quizForm.values.questions[questionIndex].answers;

  return (
    <HStack className="justify-center gap-2">
      <Box className="flex items-center gap-x-3 flex-auto">
        <Radio disabled isDisabled />

        <FormControl
          isInvalid={getIsInvalid(quizForm, `questions.${questionIndex}.answers.${index}.description`)}
          isDisabled={quizForm.isSubmitting}
        >
          <Input
            className="flex-auto"
            placeholder="Opção"
            value={quizForm.values.questions[questionIndex].answers[index].description}
            name={`questions.${questionIndex}.answers.${index}.description`}
            onChange={quizForm.handleChange}
            onBlur={quizForm.handleBlur}
          />
          <FormErrorMessage>
            {getIn(quizForm.errors, `questions.${questionIndex}.answers.${index}.description`)}
          </FormErrorMessage>
        </FormControl>
      </Box>

      {answers.length > 1 && (
        <IconButton
          isDisabled={quizForm.isSubmitting}
          type="button"
          title="Clique para remover a alternativa"
          aria-label="Clique para remover a alternativa"
          icon={<CloseIcon />}
          variant="unstyled"
          size="sm"
          onClick={onRemove}
        />
      )}
    </HStack>
  );
};
