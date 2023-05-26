import { Question } from 'src/core/entities/question';
import { Quiz } from 'src/core/entities/quiz';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { QuestionEntity } from './question';
import { UserEntity } from './user';
import { QuizAnswerEntity } from './quiz-answer';

@Entity('quiz')
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => QuizAnswerEntity, (answer) => answer.quiz, {
    cascade: true,
  })
  answers: QuizAnswerEntity[];

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  static fromDomain(quiz: Quiz): QuizEntity {
    const quizDB = new QuizEntity();

    if (quiz.id) quizDB.id = quiz.id;
    quizDB.date = new Date(quiz.date);
    quizDB.description = quiz.description;
    quizDB.name = quiz.name;
    quizDB.user = UserEntity.fromDomain(quiz.user);

    const questionsDB = quiz.questions.map(QuestionEntity.fromDomain);

    quizDB.questions = questionsDB;

    return quizDB;
  }

  toDomain(): Quiz {
    const questions =
      this.questions?.map((questionEntity) => {
        const answers =
          questionEntity.answers?.map((answerEntity) =>
            answerEntity.toDomain(),
          ) ?? [];

        return new Question({ ...questionEntity, answers });
      }) ?? [];

    return new Quiz({
      ...this,
      date: this.date.getTime(),
      questions,
      user: this.user,
    });
  }
}
