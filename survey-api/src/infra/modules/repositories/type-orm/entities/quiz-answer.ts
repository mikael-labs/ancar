import { QuizAnswer } from 'src/core/entities/quiz-answer';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AnswerEntity } from './answer';
import { QuestionEntity } from './question';
import { QuizEntity } from './quiz';
import { UserEntity } from './user';

@Entity('quiz-answer')
@Unique(['user', 'quiz', 'question'])
export class QuizAnswerEntity {
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

  static fromDomain(userQuiz: QuizAnswer): QuizAnswerEntity {
    const userQuizAnswer = new QuizAnswerEntity();

    userQuizAnswer.id = userQuiz.id;
    userQuizAnswer.answer = AnswerEntity.fromDomain(userQuiz.answer);
    userQuizAnswer.question = QuestionEntity.fromDomain(userQuiz.question);
    userQuizAnswer.quiz = QuizEntity.fromDomain(userQuiz.quiz);
    userQuizAnswer.user = UserEntity.fromDomain(userQuiz.user);

    return userQuizAnswer;
  }

  toDomain(): QuizAnswer {
    return new QuizAnswer({
      id: this.id,
      answer: this.answer,
      question: this.question,
      quiz: this.quiz.toDomain(),
      user: this.user,
    });
  }
}
