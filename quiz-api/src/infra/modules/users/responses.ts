import { ApiProperty } from '@nestjs/swagger';
import { UserId } from 'src/core/entities';

export class UserResponse {
  @ApiProperty()
  id: UserId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  CPF: string;
}
