type QuizId = number;

export type MyQuizListItem = {
  id: QuizId;
  name: string;
  description: string;
  numberOfAnswers: number;
};

export type QuizListItem = {
  id: QuizId;
  date: number;
  name: string;
  description: string;
  numberOfQuestions: number;
};

export type Question = {
  id: number;
  description: string;
  answers: { id: number; description: string }[];
};

export type Quiz = {
  id: QuizId;
  date: number;
  name: string;
  description: string;
  questions: Question[];
};

export type QuizReportQuestionAnswer = { id: number; description: string; timesSelected: number };

export type QuizReportQuestion = {
  id: number;
  description: string;
  answers: QuizReportQuestionAnswer[];
};

export type QuizReport = {
  id: QuizId;
  name: string;
  description: string;
  date: number;
  questions: QuizReportQuestion[];
};
