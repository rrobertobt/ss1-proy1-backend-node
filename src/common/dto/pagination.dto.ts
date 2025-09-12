import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ 
    example: 10, 
    description: 'Number of items per page',
    default: 10
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @ApiProperty({ 
    example: 0, 
    description: 'Page number (0-based)',
    default: 0
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  page: number = 0;
}
