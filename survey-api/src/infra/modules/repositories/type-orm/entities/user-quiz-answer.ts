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

  static fromDomain(userQuiz: UserQuizAnswer): UserQuizAnswerEntity {
    const userQuizAnswer = new UserQuizAnswerEntity();

    userQuizAnswer.id = userQuiz.id;
    userQuizAnswer.answer = AnswerEntity.fromDomain(userQuiz.answer);
    userQuizAnswer.question = QuestionEntity.fromDomain(userQuiz.question);
    userQuizAnswer.quiz = QuizEntity.fromDomain(userQuiz.quiz);
    userQuizAnswer.user = UserEntity.fromDomain(userQuiz.user);

    return userQuizAnswer;
  }

  toDomain(): UserQuizAnswer {
    return new UserQuizAnswer({
      id: this.id,
      answer: this.answer,
      question: this.question,
      quiz: this.quiz.toDomain(),
      user: this.user,
    });
  }
}
