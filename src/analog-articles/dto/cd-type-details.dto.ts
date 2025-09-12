import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class CdTypeDetailsDto {
  @ApiProperty({
    example: 2,
    description: 'Number of discs in the CD',
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly disc_count?: number = 1;

  @ApiProperty({
    example: true,
    description: 'Whether the CD has bonus content',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly has_bonus_content?: boolean = false;

  @ApiProperty({
    example: false,
    description: 'Whether the CD is remastered',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_remastered?: boolean = false;
}