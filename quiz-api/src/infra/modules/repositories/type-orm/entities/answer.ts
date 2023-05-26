import { Answer } from 'src/core/entities/answer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { QuestionEntity } from './question';

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;

  static fromDomain(answer: Answer): AnswerEntity {
    const answerEntity = new AnswerEntity();

    if (answer.id) answerEntity.id = answer.id;
    answerEntity.description = answer.description;

    return answerEntity;
  }

  toDomain(): Answer {
    return new Answer(this);
  }
}
