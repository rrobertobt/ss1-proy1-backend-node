import { ApiProperty } from '@nestjs/swagger';

export class VinylCategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the vinyl category',
  })
  readonly id: number;

  @ApiProperty({
    example: '12"',
    description: 'Size of the vinyl category',
  })
  readonly size: string;

  @ApiProperty({
    example: 'Standard 12-inch LP record',
    description: 'Description of the vinyl category',
  })
  readonly description: string | null;

  @ApiProperty({
    example: 33,
    description: 'Typical RPM for this vinyl category',
  })
  readonly typical_rpm: number;
}