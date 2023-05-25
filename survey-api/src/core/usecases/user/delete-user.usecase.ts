import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/data/usuario.repository';
import { UserId } from 'src/core/entities/user';

export type DeleteUserUseCaseRequest = {
  id: UserId;
};

export type DeleteUserUseCaseResponse = void;

export abstract class DeleteUserUseCase {
  abstract execute(
    request: DeleteUserUseCaseRequest,
  ): Promise<DeleteUserUseCaseResponse>;
}

@Injectable()
export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
  constructor(private _userRepository: UserRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    return await this._userRepository.delete(id);
  }
}
