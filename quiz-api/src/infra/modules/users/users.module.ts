import { Module } from '@nestjs/common';

import {
  DeleteUserUseCase,
  DeleteUserUseCaseImpl,
  ListUsersUseCase,
  ListUsersUseCaseImpl,
  PatchUserUseCase,
  PatchUserUseCaseImpl,
  RegisterUserUseCase,
  RegisterUserUseCaseImpl,
  UpdateUserUseCase,
  UpdateUserUseCaseImpl,
} from 'src/core/usecases/user';

import { UsersController } from './users.controller';

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
