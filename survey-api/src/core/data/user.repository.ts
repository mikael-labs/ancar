import { User, UserId } from '../entities/user';
import { Page } from '../interfaces/page';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract list(request: {
    page: number;
    pageSize: number;
  }): Promise<Page<User>>;
  abstract update(user: User): Promise<User>;
  abstract delete(userId: UserId): Promise<void>;
  abstract getById(userId: UserId): Promise<User | null>;
  abstract getByCPF(CPF: string): Promise<User | null>;
}
