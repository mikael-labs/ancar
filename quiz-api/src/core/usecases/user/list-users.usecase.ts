import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/core/data';
import { UserDTO } from 'src/core/dtos';
import { Page } from 'src/core/interfaces/page';

export interface ListUsersUseCaseRequest {
  page: number;
  pageSize: number;
}

export type ListUsersUseCaseResponse = Page<UserDTO>;

export abstract class ListUsersUseCase {
  abstract execute(
    request: ListUsersUseCaseRequest,
  ): Promise<ListUsersUseCaseResponse>;
}

@Injectable()
export class ListUsersUseCaseImpl implements ListUsersUseCase {
  constructor(private _userRepository: UserRepository) {}

  async execute({
    page,
    pageSize,
  }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
    const usersPage = await this._userRepository.list({ page, pageSize });

    return {
      ...usersPage,
      items: usersPage.items.map<UserDTO>((user) => UserDTO.fromUser(user)),
    };
  }
}
