import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/data';
import { InvalidCredentialsError } from 'src/core/errors';
import CryptoService from 'src/core/services/crypto.service';
import { TokenService } from 'src/core/services/token.service';

export interface LoginUseCaseRequest {
  CPF: string;
  password: string;
}

export type LoginUseCaseResponse = { token: string };

export abstract class LoginUseCase {
  abstract execute(request: LoginUseCaseRequest): Promise<LoginUseCaseResponse>;
}

@Injectable()
export class LoginUseCaseImpl implements LoginUseCase {
  constructor(
    private _userRepository: UserRepository,
    private _cryptoService: CryptoService,
    private _tokenService: TokenService,
  ) {}

  async execute({
    CPF,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this._userRepository.getByCPF(CPF);

    if (!user) throw new InvalidCredentialsError();

    const passwordMatch = await this._cryptoService.verify(
      password,
      user.password,
    );

    if (!passwordMatch) throw new InvalidCredentialsError();

    const token = await this._tokenService.encode({
      id: user.id,
      name: user.name,
    });

    return { token };
  }
}
