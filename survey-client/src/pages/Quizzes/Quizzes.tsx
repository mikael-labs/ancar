import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MyQuizzes } from "./MyQuizzes/MyQuizzes";
import { QuizzesToAnswer } from "./QuizzesToAnswer/QuizzesToAnswer";

export const Quizzes = () => {
  return (
    <Card className="flex flex-col w-96 m-auto bg-white" width={1200}>
      <CardHeader>
        <Box className="flex justify-between mb-3">
          <Heading color="primary.default">Quizzes</Heading>
        </Box>
        <Text color="primary.dark" size="md">
          Responda ou crie seu próprio questionário para testar seus conhecimentos!
        </Text>
      </CardHeader>

      <CardBody className="flex flex-col justify-between h-full">
        <Tabs isFitted>
          <TabList>
            <Tab>Questionários</Tab>
            <Tab>Meus Questionários</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <QuizzesToAnswer />
            </TabPanel>
            <TabPanel>
              <MyQuizzes />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button className="w-full mt-5 mx-auto" as={Link} to="/quizzes/new">
          Criar Questionário
        </Button>
      </CardBody>
    </Card>
  );
};
