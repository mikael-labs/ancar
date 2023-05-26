import { ApiProperty } from '@nestjs/swagger';

export class PageResponse<Item> {
  items: Item[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  page: number;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  nextPage: number | null;
}
