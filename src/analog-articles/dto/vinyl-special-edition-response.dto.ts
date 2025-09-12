import { ApiProperty } from '@nestjs/swagger';

export class VinylSpecialEditionResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the vinyl special edition',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Picture Disc',
    description: 'Name of the special edition',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Clear',
    description: 'Color of the vinyl',
  })
  readonly color: string | null;

  @ApiProperty({
    example: 'Transparent vinyl with special artwork',
    description: 'Material description',
  })
  readonly material_description: string | null;

  @ApiProperty({
    example: 'Includes bonus poster and stickers',
    description: 'Extra content included',
  })
  readonly extra_content: string | null;

  @ApiProperty({
    example: true,
    description: 'Whether this is a limited edition',
  })
  readonly is_limited: boolean;

  @ApiProperty({
    example: 500,
    description: 'Limited quantity available',
  })
  readonly limited_quantity: number | null;
}