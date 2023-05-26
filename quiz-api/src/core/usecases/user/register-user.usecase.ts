import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/core/data';
import { UserDTO } from 'src/core/dtos';
import { User } from 'src/core/entities';
import { BadRequestError } from 'src/core/errors';
import { CryptoService } from 'src/core/services';

export interface RegisterUserUseCaseRequest {
  CPF: string;
  name: string;
  password: string;
}

export type RegisterUserUseCaseResponse = UserDTO;

export abstract class RegisterUserUseCase {
  abstract execute(
    request: RegisterUserUseCaseRequest,
  ): Promise<RegisterUserUseCaseResponse>;
}

@Injectable()
export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor(
    private _userRepository: UserRepository,
    private _cryptoService: CryptoService,
  ) {}

  async execute({
    CPF,
    name,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const sameCPFUser = await this._userRepository.getByCPF(CPF);

    if (sameCPFUser)
      throw new BadRequestError('Usuário com mesmo CPF cadastrado');

    const encodedPassword = await this._cryptoService.encode(password);

    const user = await this._userRepository.create(
      new User({ name, password: encodedPassword, CPF }),
    );

    return UserDTO.fromUser(user);
  }
}
