import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty()
  CPF: string;

  @ApiProperty()
  password: string;
}
