import { UserId } from '../entities';
import { Quiz, QuizId } from '../entities/quiz';
import { Page } from '../interfaces/page';

export abstract class QuizRepository {
  /**
   * Lists Quizzes paginated and filter using parameters answeredBy and notAnsweredBy.
   *
   * If one of these is passed, the quizzes answered (or not answered) by the User with the passed id are not returned,
   * nor the quizzes made by themselves
   */
  abstract list(request: {
    page: number;
    pageSize: number;
    answeredBy?: UserId;
    notAnsweredBy?: UserId;
  }): Promise<Page<Quiz>>;
  /**
   * List the Quizzes paginated and created by the user with the passed userId.
   *
   * This query kind of breaks rules of clean architecture, but it was necessary due to performance reasons (return the quizzes with all the answers of all the users would be too costful).
   */
  abstract listQuizzesWithNumberOfAnswers(request: {
    page: number;
    pageSize: number;
    userId: UserId;
  }): Promise<Page<Quiz & { numberOfAnswers: number }>>;
  abstract create(quiz: Quiz): Promise<Quiz>;
  abstract delete(quizId: QuizId): Promise<void>;
  abstract getById(quizId: QuizId): Promise<Quiz | null>;
  abstract update(quiz: Quiz): Promise<Quiz>;
}
