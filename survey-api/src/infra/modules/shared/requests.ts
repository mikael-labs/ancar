import { ApiProperty } from '@nestjs/swagger';

export class ListPaginatedRequest {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  pageSize?: number;
}
