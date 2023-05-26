import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common/pipes';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserId } from 'src/core/entities';

import {
  DeleteUserUseCase,
  ListUsersUseCase,
  PatchUserUseCase,
  RegisterUserUseCase,
  UpdateUserUseCase,
} from 'src/core/usecases/user';

import { PaginatedApiResponse } from '../shared/utils';

import { RegisterUserRequest, UpdateUserRequest } from './requests';
import { UserResponse } from './responses';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsersController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly registerUser: RegisterUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly patchUser: PatchUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @PaginatedApiResponse(UserResponse)
  @Get('/')
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return this.listUsers.execute({ page, pageSize });
  }

  @ApiCreatedResponse({ type: UserResponse })
  @Post('/')
  register(@Body() request: RegisterUserRequest) {
    return this.registerUser.execute(request);
  }

  @ApiOkResponse({ type: UserResponse })
  @Put('/:id')
  update(
    @Body() request: RegisterUserRequest,
    @Param('id', ParseIntPipe) id: UserId,
  ) {
    this.updateUser.execute({
      id,
      ...request,
    });
  }

  @ApiOkResponse({ type: UserResponse })
  @Patch('/:id')
  patch(
    @Body() request: UpdateUserRequest,
    @Param('id', ParseIntPipe) id: UserId,
  ) {
    this.patchUser.execute({
      id,
      ...request,
    });
  }

  @ApiNoContentResponse()
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: UserId) {
    this.deleteUser.execute({
      id,
    });
  }
}
