import { Question } from 'src/core/entities/question';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { AnswerEntity } from './answer';
import { QuizEntity } from './quiz';

@Entity()
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question, {
    cascade: true,
  })
  answers: AnswerEntity[];

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  quiz: QuizEntity;

  static fromDomain(question: Question): QuestionEntity {
    const questionDB = new QuestionEntity();

    if (question.id) questionDB.id = question.id;
    questionDB.description = question.description;

    const answersDB = question.answers.map(AnswerEntity.fromDomain);
    questionDB.answers = answersDB;

    return questionDB;
  }
}
