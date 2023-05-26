import { HttpClient, httpClient } from "../http/HttpClient";
import { Page } from "../types";
import { AnswerQuizRequest, CreateQuizRequest, GetQuizzesRequest, UpdateQuizRequest } from "./requests";
import { MyQuizListItem, Quiz, QuizListItem, QuizReport } from "./responses";

export interface QuizService {
  getQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>>;
  createQuiz(request: CreateQuizRequest): Promise<any>;
  getQuizById(id: number): Promise<Quiz>;
  updateQuiz(request: UpdateQuizRequest): Promise<any>;
  answerQuiz(request: AnswerQuizRequest): Promise<any>;
  getAnsweredQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>>;
  getMyQuizzes(request: GetQuizzesRequest): Promise<Page<MyQuizListItem>>;
  deleteQuiz(quizId: number): Promise<void>;
  getQuizReport(quizId: number): Promise<QuizReport>;
}

class QuizServiceImpl implements QuizService {
  constructor(private _httpClient: HttpClient) {}

  getQuizReport(quizId: number): Promise<QuizReport> {
    return this._httpClient.get(`/questionarios/${quizId}/respostas/relatorio`);
  }

  deleteQuiz(quizId: number): Promise<void> {
    return this._httpClient.delete(`/questionarios/${quizId}`);
  }

  answerQuiz({ quizId, ...request }: AnswerQuizRequest): Promise<any> {
    return this._httpClient.post(`/questionarios/${quizId}/respostas`, { ...request });
  }

  getQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>> {
    return this._httpClient.get("/questionarios/to-answer", { query: request });
  }

  getAnsweredQuizzes(request: GetQuizzesRequest): Promise<Page<QuizListItem>> {
    return this._httpClient.get("/questionarios/answered", { query: request });
  }

  getMyQuizzes(request: GetQuizzesRequest): Promise<Page<MyQuizListItem>> {
    return this._httpClient.get("/questionarios/my", { query: request });
  }

  createQuiz(request: CreateQuizRequest): Promise<any> {
    return this._httpClient.post("/questionarios", request);
  }

  getQuizById(id: number): Promise<Quiz> {
    return this._httpClient.get(`/questionarios/${id}`);
  }

  updateQuiz(request: UpdateQuizRequest): Promise<any> {
    return this._httpClient.put(`/questionarios/${request.id}`, request);
  }
}

export const quizService: QuizService = new QuizServiceImpl(httpClient);
