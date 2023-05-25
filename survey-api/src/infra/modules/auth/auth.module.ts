import { Module } from '@nestjs/common';
import {
  LoginUseCase,
  LoginUseCaseImpl,
} from 'src/core/usecases/auth/login.usecase';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt-passport.strategy';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Module({
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    { provide: LoginUseCase, useClass: LoginUseCaseImpl },
  ],
})
export class AuthModule {}
