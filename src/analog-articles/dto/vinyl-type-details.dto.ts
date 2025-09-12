import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, Min, IsIn } from 'class-validator';

export class VinylTypeDetailsDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the vinyl category',
  })
  @IsInt()
  @Min(1)
  readonly vinyl_category_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the vinyl special edition',
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly vinyl_special_edition_id?: number;

  @ApiProperty({
    example: 33,
    description: 'RPM of the vinyl (33 or 45)',
    required: false,
  })
  @IsInt()
  @IsIn([33, 45])
  @IsOptional()
  readonly rpm?: number = 33;

  @ApiProperty({
    example: false,
    description: 'Whether the vinyl is a limited edition',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_limited_edition?: boolean = false;

  @ApiProperty({
    example: 500,
    description: 'Remaining limited stock (required if is_limited_edition is true)',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly remaining_limited_stock?: number;
}