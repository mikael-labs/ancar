import { QuizId, UserId } from '../entities';
import { UserQuizAnswer, UserQuizId } from '../entities/user-quiz';

export abstract class UserQuizRepository {
  abstract saveQuiz(quiz: UserQuizAnswer): Promise<UserQuizAnswer>;
  abstract getByQuizAndUser(
    quizId: QuizId,
    userId: UserId,
  ): Promise<UserQuizAnswer | null>;
}
