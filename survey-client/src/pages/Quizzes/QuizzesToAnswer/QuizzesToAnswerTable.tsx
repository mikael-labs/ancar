import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { QuizListItem } from "../../../services/QuizService/responses";
import { Link } from "react-router-dom";

type Props = {
  quizzes: QuizListItem[];
};

export const QuizzesTable = ({ quizzes }: Props) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Questões</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {quizzes.map((quiz) => (
            <Tr key={quiz.id}>
              <Td>{quiz.name}</Td>
              <Td>{quiz.description}</Td>
              <Td>{quiz.numberOfQuestions}</Td>
              <Td>
                <Button as={Link} to={`/quizzes/${quiz.id}/answer`}>
                  Iniciar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
