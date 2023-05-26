import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoginUseCase } from 'src/core/usecases/auth/login.usecase';
import { LoginRequest } from './requests';
import { LoginResponse } from './responses';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private _login: LoginUseCase) {}

  @ApiOkResponse({ type: LoginResponse })
  @Post('/login')
  login(@Body() request: LoginRequest) {
    return this._login.execute(request);
  }
}
