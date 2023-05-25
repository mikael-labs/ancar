import { QuizAnswer } from 'src/core/entities/quiz-answer';
import { UserQuizAnswer } from 'src/core/entities/user-quiz';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AnswerEntity } from './answer';
import { QuestionEntity } from './question';
import { QuizEntity } from './quiz';
import { UserEntity } from './user';

@Entity()
@Unique(['user', 'quiz', 'question'])
export class UserQuizAnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => QuizEntity, {
    onDelete: 'CASCADE',
  })
  quiz: QuizEntity;

  @ManyToOne(() => AnswerEntity)
  answer: AnswerEntity;

  @ManyToOne(() => QuestionEntity)
  question: QuestionEntity;

  static fromUserQuiz(userQuiz: UserQuizAnswer): UserQuizAnswerEntity[] {
    const userQuizAnswers = userQuiz.answers.map((answer) => {
      const userQuizAnswer = new UserQuizAnswerEntity();
      userQuizAnswer.id = answer.id;
      userQuizAnswer.answer = AnswerEntity.fromDomain(answer.answer);
      userQuizAnswer.question = QuestionEntity.fromDomain(answer.question);
      userQuizAnswer.quiz = QuizEntity.fromDomain(userQuiz.quiz);
      userQuizAnswer.user = UserEntity.fromDomain(userQuiz.user);

      return userQuizAnswer;
    });

    return userQuizAnswers;
  }

  toDomain(): QuizAnswer {
    return new QuizAnswer({
      id: this.id,
      answer: this.answer,
      question: this.question,
    });
  }
}
