import { ApiProperty } from '@nestjs/swagger';

export class CartArticleArtistDto {
  @ApiProperty({
    example: 3,
    description: 'The ID of the artist',
  })
  id: number;

  @ApiProperty({
    example: 'The Beatles',
    description: 'The name of the artist',
  })
  name: string;
}

export class CartArticleCurrencyDto {
  @ApiProperty({
    example: 'USD',
    description: 'The currency code',
  })
  code: string;

  @ApiProperty({
    example: '$',
    description: 'The currency symbol',
  })
  symbol: string;
}

export class CartArticleDto {
  @ApiProperty({
    example: 5,
    description: 'The ID of the analog article',
  })
  id: number;

  @ApiProperty({
    example: 'Abbey Road',
    description: 'The title of the article',
  })
  title: string;

  @ApiProperty({
    type: CartArticleArtistDto,
    description: 'The artist information',
  })
  artist: CartArticleArtistDto;

  @ApiProperty({
    example: 'vinyl',
    description: 'The type of analog article',
    enum: ['cd', 'vinyl', 'cassette']
  })
  type: string;

  @ApiProperty({
    example: 29.99,
    description: 'The price of the article',
  })
  price: number;

  @ApiProperty({
    type: CartArticleCurrencyDto,
    description: 'The currency information',
  })
  currency: CartArticleCurrencyDto;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The image URL of the article',
    nullable: true,
  })
  image_url: string | null;

  @ApiProperty({
    example: true,
    description: 'Whether the article is available for purchase',
  })
  is_available: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the article is available for preorder',
  })
  is_preorder: boolean;

  @ApiProperty({
    example: 15,
    description: 'The current stock quantity',
  })
  stock_quantity: number;
}

export class CartItemDto {
  @ApiProperty({
    example: 15,
    description: 'The ID of the cart item',
  })
  id: number;

  @ApiProperty({
    type: CartArticleDto,
    description: 'The article information',
  })
  article: CartArticleDto;

  @ApiProperty({
    example: 2,
    description: 'The quantity of the article in the cart',
  })
  quantity: number;

  @ApiProperty({
    example: 29.99,
    description: 'The unit price of the article',
  })
  unit_price: number;

  @ApiProperty({
    example: 0,
    description: 'The discount applied to this item',
  })
  discount_applied: number;

  @ApiProperty({
    example: 59.98,
    description: 'The total price for this item (unit price * quantity - discount)',
  })
  total_price: number;
}

export class ShoppingCartDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the shopping cart',
  })
  id: number;

  @ApiProperty({
    example: 3,
    description: 'The total number of items in the cart',
  })
  total_items: number;

  @ApiProperty({
    example: 89.97,
    description: 'The subtotal of all items in the cart',
  })
  subtotal: number;

  @ApiProperty({
    type: [CartItemDto],
    description: 'The items in the shopping cart',
  })
  items: CartItemDto[];
}

export class ShoppingCartResponseDto {
  @ApiProperty({
    type: ShoppingCartDto,
    description: 'The shopping cart data',
  })
  data: ShoppingCartDto;
}