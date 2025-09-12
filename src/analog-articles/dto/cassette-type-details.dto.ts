import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, IsString, Min } from 'class-validator';

export class CassetteTypeDetailsDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the cassette category',
  })
  @IsInt()
  @Min(1)
  readonly cassette_category_id: number;

  @ApiProperty({
    example: 'TDK',
    description: 'Brand of the cassette',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly brand?: string;

  @ApiProperty({
    example: false,
    description: 'Whether the cassette is chrome tape',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_chrome_tape?: boolean = false;
}