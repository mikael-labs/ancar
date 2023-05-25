import { ApiProperty, PartialType } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty()
  CPF: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

export class UpdateUserRequest extends PartialType(RegisterUserRequest) {}
