import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/data/usuario.repository';
import { UserDTO } from 'src/core/dtos/user.dto';
import { User, UserId } from 'src/core/entities/user';
import { NotFoundError } from 'src/core/errors';

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
  constructor(private _usuarioRepository: UserRepository) {}

  async execute({
    id,
    ...usuarioProps
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userWithSameId = await this._usuarioRepository.getById(id);

    if (!userWithSameId) throw new NotFoundError('Usuário não encontrado');

    const updatedUser = new User({ id, ...usuarioProps });

    await this._usuarioRepository.update(updatedUser);

    return UserDTO.fromUser(updatedUser);
  }
}
