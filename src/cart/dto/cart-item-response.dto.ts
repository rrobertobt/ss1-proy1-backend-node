import { ApiProperty } from '@nestjs/swagger';

export class CartItemResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the shopping cart',
  })
  cart_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the cart item',
  })
  item_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the analog article',
  })
  article_id: number;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the article in the cart',
  })
  quantity: number;

  @ApiProperty({
    example: 29.99,
    description: 'The unit price of the article',
  })
  unit_price: number;

  @ApiProperty({
    example: 29.99,
    description: 'The total price for this item (unit price * quantity - discount)',
  })
  total_price: number;

  @ApiProperty({
    example: 59.98,
    description: 'The new total amount for the entire cart',
  })
  new_cart_total: number;
}

export class CartItemCreatedResponseDto {
  @ApiProperty({
    description: 'The cart item data',
    type: CartItemResponseDto,
  })
  data: CartItemResponseDto;
}