import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/core/services/token.service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private _jwt: JwtService) {}

  encode<T extends string | object = any>(
    payload: T,
  ): string | Promise<string> {
    return this._jwt.sign(payload);
  }

  decode<T extends string | object = any>(token: string): T {
    return this._jwt.decode(token) as T;
  }
}
