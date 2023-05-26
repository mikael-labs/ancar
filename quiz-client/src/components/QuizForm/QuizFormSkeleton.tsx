import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  HStack,
  IconButton,
  Input,
  Radio,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useMemo } from "react";

type Props = {
  numberOfQuestions?: number;
  answersPerQuestion?: number;
};

export const QuizFormSkeleton = ({ numberOfQuestions = 2, answersPerQuestion = 2 }: Props) => {
  const answersSkeletons = useMemo(() => Array.from({ length: numberOfQuestions }), [numberOfQuestions]);
  const questionsPerAnswerSkeleton = useMemo(() => Array.from({ length: answersPerQuestion }), [answersPerQuestion]);

  return (
    <Card width={800}>
      <CardHeader>
        <Skeleton height="50px" />
      </CardHeader>
      <CardBody>
        <Skeleton height="70px" className="mb-5" />

        <HStack justifyContent="space-between" className="mb-5">
          <Skeleton height="30px" width="75px" />
          <Skeleton>
            <Button>Adicionar</Button>
          </Skeleton>
        </HStack>

        <Stack className="gap-2">
          {answersSkeletons.map((_, questionIndex) => (
            <Card key={questionIndex}>
              <CardHeader>
                <Skeleton>
                  <Input className="w-full" />
                </Skeleton>
              </CardHeader>

              <CardBody>
                <Stack className="gap-2">
                  {questionsPerAnswerSkeleton.map((_, answerIndex) => (
                    <HStack key={answerIndex} justifyContent="space-between">
                      <Skeleton>
                        <Radio />
                      </Skeleton>
                      <Skeleton>
                        <Input className="flex-auto" />
                      </Skeleton>

                      <Skeleton>
                        <Checkbox />
                      </Skeleton>
                      <Skeleton>
                        <IconButton aria-label="" icon={<DeleteIcon />} />
                      </Skeleton>
                    </HStack>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
