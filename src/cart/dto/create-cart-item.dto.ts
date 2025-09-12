import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the analog article to add to cart',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly article_id: number;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the article to add to cart',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly quantity: number;
}