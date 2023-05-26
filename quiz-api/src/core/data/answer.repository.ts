import { Answer, AnswerId } from '../entities';
import { Page } from '../interfaces/page';

export abstract class AnswerRepository {
  abstract list(request: {
    page: number;
    pageSize: number;
  }): Promise<Page<Answer>>;
  abstract create(answer: Answer): Promise<Answer>;
  abstract update(answer: Answer): Promise<Answer>;
  abstract delete(answerId: AnswerId): Promise<Answer>;
}
