import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigurationService } from '../../configuration/configuration.service';
import { UserRepository } from 'src/core/data';
import { AuthenticatedUser } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _userRepository: UserRepository,
    configService: ConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getTokenSecret(),
    });
  }

  async validate(payload: any): Promise<AuthenticatedUser> {
    const user = await this._userRepository.getById(payload.id);

    if (!user) throw new UnauthorizedException('Sessão inválida ou expirada');

    return { id: payload.id, CPF: user.CPF };
  }
}
