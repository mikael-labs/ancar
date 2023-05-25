import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/data/usuario.repository';
import { UserDTO } from 'src/core/dtos/user.dto';
import { User, UserId } from 'src/core/entities/user';
import { NotFoundError } from 'src/core/errors';

export type PatchUserUseCaseRequest = Omit<Partial<User>, 'id'> & {
  id: UserId;
};

export type PatchUserUseCaseResponse = UserDTO;

export abstract class PatchUserUseCase {
  abstract execute(
    request: PatchUserUseCaseRequest,
  ): Promise<PatchUserUseCaseResponse>;
}

@Injectable()
export class PatchUserUseCaseImpl implements PatchUserUseCase {
  constructor(private _usuarioRepository: UserRepository) {}

  async execute({
    id,
    ...patchProps
  }: PatchUserUseCaseRequest): Promise<PatchUserUseCaseResponse> {
    const user = await this._usuarioRepository.getById(id);

    if (!user) throw new NotFoundError('Usuário não encontrado');

    const patchedUser = new User({ ...user, ...patchProps });

    await this._usuarioRepository.update(patchedUser);

    return UserDTO.fromUser(patchedUser);
  }
}
