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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from 'src/core/entities/user';
import { DeleteUserUseCase } from 'src/core/usecases/user/delete-user.usecase';
import { ListUsersUseCase } from 'src/core/usecases/user/list-users.usecase';
import { PatchUserUseCase } from 'src/core/usecases/user/patch-user.usecase';
import { RegisterUserUseCase } from 'src/core/usecases/user/register-user.usecase';
import { UpdateUserUseCase } from 'src/core/usecases/user/update-user.usecase';
import { PaginatedApiResponse } from '../shared/utils';
import { RegisterUserRequest, UpdateUserRequest } from './requests';
import { UserResponse } from './responses';

@ApiTags('users')
@Controller('/users')
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
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
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
