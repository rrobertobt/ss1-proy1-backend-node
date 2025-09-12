import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateCartItemQuantityDto {
  @ApiProperty({
    example: 3,
    description: 'The new quantity for the cart item',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly quantity: number;
}