import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/data/usuario.repository';
import { User, UserId } from 'src/core/entities/user';
import { Page } from 'src/core/interfaces/page';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  private _userRepository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this._userRepository = dataSource.getRepository(UserEntity);
  }

  create(user: User): Promise<User> {
    const userDB = new UserEntity();

    userDB.CPF = user.CPF;
    userDB.name = user.name;
    userDB.password = user.password;

    return this._userRepository.save(userDB);
  }

  async list({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): Promise<Page<User>> {
    const skip = (page - 1) * pageSize;

    const [usersDB, total] = await this._userRepository.findAndCount({
      skip,
      take: pageSize,
    });

    const usersPage: Page<User> = {
      items: usersDB,
      nextPage: null,
      page,
      total,
      totalPages: Math.ceil(total / pageSize),
    };

    return usersPage;
  }

  update(user: User): Promise<User> {
    const userDB = new UserEntity();
    userDB.id = user.id;
    userDB.CPF = user.CPF;
    userDB.name = user.name;
    userDB.password = user.password;

    return this._userRepository.update(user.id, userDB) as any;
  }

  async delete(userId: UserId): Promise<void> {
    await this._userRepository.delete(userId);
  }

  getById(userId: UserId): Promise<User | null> {
    return this._userRepository.findOneBy({
      id: userId,
    });
  }

  getByCPF(CPF: string): Promise<User | null> {
    return this._userRepository.findOneBy({
      CPF,
    });
  }
}
