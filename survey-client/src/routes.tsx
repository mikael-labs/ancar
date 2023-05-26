import { Main } from "./layouts/Main/Main";
import { AnswerQuiz } from "./pages/AnswerQuiz/AnswerQuiz";
import { CreateQuiz } from "./pages/CreateQuiz/CreateQuiz";
import { EditQuiz } from "./pages/EditQuiz/EditQuiz";
import { Login } from "./pages/Login/Login";
import { QuizReport } from "./pages/QuizReport/QuizReport";
import { Quizzes } from "./pages/Quizzes/Quizzes";

export const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/quizzes", element: <Quizzes /> },
      { path: "/quizzes/new", element: <CreateQuiz /> },
      { path: "/quizzes/:id", element: <EditQuiz /> },
      { path: "/quizzes/:id/answer", element: <AnswerQuiz /> },
      { path: "/quizzes/:id/report", element: <QuizReport /> },
    ],
  },
];
