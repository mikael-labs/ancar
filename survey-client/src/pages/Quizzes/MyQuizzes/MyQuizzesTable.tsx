import { HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { MyQuizListItem } from "../../../services/QuizService/responses";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

type Props = {
  quizzes: MyQuizListItem[];
  onRemoveQuiz: (quiz: MyQuizListItem) => void;
};

export const MyQuizzesTable = ({ quizzes, onRemoveQuiz }: Props) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Respostas</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {quizzes.map((quiz) => (
            <Tr key={quiz.id}>
              <Td>{quiz.name}</Td>
              <Td>{quiz.description}</Td>
              <Td>{quiz.numberOfAnswers}</Td>
              <Td>
                <HStack className="items-center">
                  <IconButton
                    variant="link"
                    title={`Clique para editar o quiz ${quiz.name}`}
                    aria-label={`Clique para editar o quiz ${quiz.name}`}
                    icon={<EditIcon />}
                    as={Link}
                    to={`/quizzes/${quiz.id}`}
                  />
                  <IconButton
                    variant="link"
                    title={`Clique para visualizar as respostas o quiz ${quiz.name}`}
                    aria-label={`Clique para visualizar as respostas o quiz ${quiz.name}`}
                    as={Link}
                    to={`/quizzes/${quiz.id}/report`}
                    icon={<ViewIcon />}
                  />
                  <IconButton
                    colorScheme="red"
                    title={`Clique para remover o quiz ${quiz.name}`}
                    aria-label={`Clique para remover o quiz ${quiz.name}`}
                    onClick={() => onRemoveQuiz(quiz)}
                    icon={<DeleteIcon />}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
