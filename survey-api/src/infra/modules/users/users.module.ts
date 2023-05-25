import { Module } from '@nestjs/common';

import {
  DeleteUserUseCase,
  DeleteUserUseCaseImpl,
} from 'src/core/usecases/user/delete-user.usecase';
import {
  ListUsersUseCase,
  ListUsersUseCaseImpl,
} from 'src/core/usecases/user/list-users.usecase';
import {
  PatchUserUseCase,
  PatchUserUseCaseImpl,
} from 'src/core/usecases/user/patch-user.usecase';
import {
  RegisterUserUseCase,
  RegisterUserUseCaseImpl,
} from 'src/core/usecases/user/register-user.usecase';

import { UsersController } from './users.controller';
import {
  UpdateUserUseCase,
  UpdateUserUseCaseImpl,
} from 'src/core/usecases/user/update-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: ListUsersUseCase, useClass: ListUsersUseCaseImpl },
    { provide: PatchUserUseCase, useClass: PatchUserUseCaseImpl },
    { provide: RegisterUserUseCase, useClass: RegisterUserUseCaseImpl },
    { provide: DeleteUserUseCase, useClass: DeleteUserUseCaseImpl },
    { provide: UpdateUserUseCase, useClass: UpdateUserUseCaseImpl },
  ],
})
export class UsersModule {}
