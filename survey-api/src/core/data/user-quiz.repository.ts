import { QuizId, UserId } from '../entities';
import { UserQuizAnswer, UserQuizAnswerId } from '../entities/user-quiz';
import { Page } from '../interfaces/page';

export abstract class QuizAnswerRepository {
  abstract saveUserQuizAnswers(
    answers: UserQuizAnswer[],
  ): Promise<UserQuizAnswer[]>;
  abstract getByQuizAndUser(
    quizId: QuizId,
    userId: UserId,
  ): Promise<UserQuizAnswer[]>;
  abstract update(quizAnswer: UserQuizAnswer): Promise<UserQuizAnswer>;
  abstract getById(
    quizAnwerId: UserQuizAnswerId,
  ): Promise<UserQuizAnswer | null>;
  abstract listByQuiz(request: {
    quizId: QuizId;
    page: number;
    pageSize: number;
  }): Promise<Page<UserQuizAnswer>>;
  abstract delete(quizAnswerId: UserQuizAnswerId[]): Promise<void>;
  abstract delete(quizAnswerId: UserQuizAnswerId): Promise<void>;
}
