import { AuthGuard } from "./components/AuthGuard/AuthGuard";
import { Main } from "./layouts/Main/Main";
import { AnswerQuiz } from "./pages/AnswerQuiz/AnswerQuiz";
import { CreateQuiz } from "./pages/CreateQuiz/CreateQuiz";
import { EditQuiz } from "./pages/EditQuiz/EditQuiz";
import { Login } from "./pages/Login/Login";
import { QuizReport } from "./pages/QuizReport/QuizReport";
import { Quizzes } from "./pages/Quizzes/Quizzes";
import { Register } from "./pages/Register/Register";

export const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/quizzes",
        element: <AuthGuard />,
        children: [
          { path: "", element: <Quizzes /> },
          { path: "new", element: <CreateQuiz /> },
          { path: ":id", element: <EditQuiz /> },
          { path: ":id/answer", element: <AnswerQuiz /> },
          { path: ":id/report", element: <QuizReport /> },
        ],
      },
    ],
  },
];
