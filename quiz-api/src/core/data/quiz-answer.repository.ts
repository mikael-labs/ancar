import { QuizId, UserId } from '../entities';
import { QuizAnswer, QuizAnswerId } from '../entities/quiz-answer';
import { Page } from '../interfaces/page';

export abstract class QuizAnswerRepository {
  abstract saveUserQuizAnswers(answers: QuizAnswer[]): Promise<QuizAnswer[]>;
  abstract getByQuizAndUser(
    quizId: QuizId,
    userId: UserId,
  ): Promise<QuizAnswer[]>;
  abstract listAllByQuiz(quizId: QuizId): Promise<QuizAnswer[]>;
  abstract update(quizAnswer: QuizAnswer): Promise<QuizAnswer>;
  abstract getById(quizAnwerId: QuizAnswerId): Promise<QuizAnswer | null>;
  abstract listByQuiz(request: {
    quizId: QuizId;
    page: number;
    pageSize: number;
  }): Promise<Page<QuizAnswer>>;
  abstract delete(quizAnswerId: QuizAnswerId[]): Promise<void>;
  abstract delete(quizAnswerId: QuizAnswerId): Promise<void>;
}
