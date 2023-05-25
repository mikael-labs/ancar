import { HttpClient, httpClient } from "../http/HttpClient";
import { Page } from "../types";
import { AnswerQuizRequest, CreateQuizRequest, GetQuizzesRequest, UpdateQuizRequest } from "./requests";
import { MyQuizListItem, Quiz, QuizListItem } from "./responses";

export interface QuizService {
  getQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>>;
  createQuiz(request: CreateQuizRequest): Promise<any>;
  getQuizById(id: number): Promise<Quiz>;
  updateQuiz(request: UpdateQuizRequest): Promise<any>;
  answerQuiz(request: AnswerQuizRequest): Promise<any>;
  getAnsweredQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>>;
  getMyQuizzes(request: GetQuizzesRequest): Promise<Page<MyQuizListItem>>;
  deleteQuiz(quizId: number): Promise<void>;
}

class QuizServiceImpl implements QuizService {
  constructor(private _httpClient: HttpClient) {}

  deleteQuiz(quizId: number): Promise<void> {
    return this._httpClient.delete(`/questionarios/${quizId}`);
  }

  answerQuiz({ quizId, ...request }: AnswerQuizRequest): Promise<any> {
    return this._httpClient
      .post(`/questionarios/${quizId}/respostas`, { ...request })
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }

  getQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>> {
    return this._httpClient
      .get("/questionarios/to-answer", { query: request })
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }

  getAnsweredQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>> {
    return this._httpClient
      .get("/questionarios/answered", { query: request })
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }

  getMyQuizzes(request: GetQuizzesRequest): Promise<Page<MyQuizListItem>> {
    return this._httpClient
      .get("/questionarios/my", { query: request })
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }

  createQuiz(request: CreateQuizRequest): Promise<any> {
    return this._httpClient
      .post("/questionarios", request)
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }

  getQuizById(id: number): Promise<Quiz> {
    return this._httpClient
      .get(`/questionarios/${id}`)
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }

  updateQuiz(request: UpdateQuizRequest): Promise<any> {
    return this._httpClient
      .put(`/questionarios/${request.id}`, request)
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }
}

export const quizService: QuizService = new QuizServiceImpl(httpClient);
