import { ApiProperty } from '@nestjs/swagger';

export class CassetteCategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the cassette category',
  })
  readonly id: number;

  @ApiProperty({
    example: 'New',
    description: 'Name of the cassette category',
  })
  readonly name: string;

  @ApiProperty({
    example: 0.00,
    description: 'Discount percentage for this category',
  })
  readonly discount_percentage: number;

  @ApiProperty({
    example: 'Brand new, sealed cassette',
    description: 'Description of the category',
  })
  readonly description: string | null;
}