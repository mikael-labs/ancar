import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/core/data';
import { UserDTO } from 'src/core/dtos';
import { User, UserId } from 'src/core/entities';
import { NotFoundError } from 'src/core/errors';
import { CryptoService } from 'src/core/services';

export type UpdateUserUseCaseRequest = Omit<User, 'id'> & {
  id: UserId;
};

export type UpdateUserUseCaseResponse = UserDTO;

export abstract class UpdateUserUseCase {
  abstract execute(
    request: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse>;
}

@Injectable()
export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  constructor(
    private _usuarioRepository: UserRepository,
    private _cryptoService: CryptoService,
  ) {}

  async execute({
    id,
    password,
    ...usuarioProps
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userWithSameId = await this._usuarioRepository.getById(id);

    if (!userWithSameId) throw new NotFoundError('Usuário não encontrado');

    const newPassword = await this._cryptoService.encode(password);

    const updatedUser = new User({
      id,
      password: newPassword,
      ...usuarioProps,
    });

    await this._usuarioRepository.update(updatedUser);

    return UserDTO.fromUser(updatedUser);
  }
}
