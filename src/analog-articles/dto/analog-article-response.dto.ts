import { ApiProperty } from '@nestjs/swagger';

export class AnalogArticleResponseDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the analog article' })
  id: number;

  @ApiProperty({ example: 'Abbey Road', description: 'The title of the analog article' })
  title: string;

  @ApiProperty({ example: 1, description: 'The ID of the artist' })
  artist_id: number;

  @ApiProperty({ example: 29.99, description: 'The price of the analog article' })
  price: number;

  @ApiProperty({ example: 1, description: 'The ID of the currency' })
  currency_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the music genre' })
  music_genre_id: number;

  @ApiProperty({ example: '1969-09-26', description: 'The release date of the article', nullable: true })
  release_date: string | null;

  @ApiProperty({ 
    example: 'The Beatles eleventh studio album', 
    description: 'Description of the analog article',
    nullable: true
  })
  description: string | null;

  @ApiProperty({ example: '12 x 12 inches', description: 'Dimensions of the article', nullable: true })
  dimensions: string | null;

  @ApiProperty({ example: 180, description: 'Weight in grams', nullable: true })
  weight_grams: number | null;

  @ApiProperty({ example: '194397215915', description: 'Barcode of the article', nullable: true })
  barcode: string | null;

  @ApiProperty({ example: 50, description: 'Current stock quantity' })
  stock_quantity: number;

  @ApiProperty({ example: 5, description: 'Minimum stock level' })
  min_stock_level: number;

  @ApiProperty({ example: 100, description: 'Maximum stock level' })
  max_stock_level: number;

  @ApiProperty({ example: true, description: 'Whether the article is available for purchase' })
  is_available: boolean;

  @ApiProperty({ example: false, description: 'Whether the article is a preorder' })
  is_preorder: boolean;

  @ApiProperty({ example: '2024-12-25', description: 'Preorder release date', nullable: true })
  preorder_release_date: string | null;

  @ApiProperty({ example: '2024-12-20', description: 'Preorder end date', nullable: true })
  preorder_end_date: string | null;

  @ApiProperty({ 
    example: 'https://example.com/images/abbey-road.jpg', 
    description: 'URL of the article image',
    nullable: true
  })
  image_url: string | null;

  @ApiProperty({ example: 0, description: 'Total number of units sold' })
  total_sold: number;

  @ApiProperty({ example: 0.00, description: 'Average rating of the article' })
  average_rating: number;

  @ApiProperty({ example: 0, description: 'Total number of ratings' })
  total_ratings: number;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updated_at: Date;
}