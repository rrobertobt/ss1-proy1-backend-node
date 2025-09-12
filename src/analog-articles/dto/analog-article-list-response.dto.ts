import { ApiProperty } from '@nestjs/swagger';

export class ArtistSummaryDto {
  @ApiProperty({ example: 1, description: 'Artist ID' })
  id: number;

  @ApiProperty({ example: 'El Gordo', description: 'Artist name' })
  name: string;
}

export class CurrencyDto {
  @ApiProperty({ example: 'GTQ', description: 'Currency code' })
  code: string;

  @ApiProperty({ example: 'Q', description: 'Currency symbol' })
  symbol: string;
}

export class GenreSummaryDto {
  @ApiProperty({ example: 1, description: 'Genre ID' })
  id: number;

  @ApiProperty({ example: 'Rock', description: 'Genre name' })
  name: string;
}

export class AnalogArticleListItemDto {
  @ApiProperty({ example: 3, description: 'The unique identifier of the analog article' })
  id: number;

  @ApiProperty({ example: 'El tercer disco de el gordo', description: 'The title of the analog article' })
  title: string;

  @ApiProperty({ description: 'Artist information' })
  artist: ArtistSummaryDto;

  @ApiProperty({ example: 'cd', description: 'Type of analog article', enum: ['cd', 'vinyl', 'cassette'] })
  type: string;

  @ApiProperty({ example: 29.99, description: 'The price of the analog article' })
  price: number;

  @ApiProperty({ description: 'Currency information' })
  currency: CurrencyDto;

  @ApiProperty({ description: 'Genre information' })
  genre: GenreSummaryDto;

  @ApiProperty({ example: 'https://example.com/images/abbey-road.jpg', description: 'URL of the article image', nullable: true })
  imageUrl: string | null;

  @ApiProperty({ example: 0, description: 'Average rating of the article' })
  averageRating: number;

  @ApiProperty({ example: 0, description: 'Total number of ratings' })
  totalRatings: number;

  @ApiProperty({ example: 50, description: 'Current stock quantity' })
  stockQuantity: number;

  @ApiProperty({ example: true, description: 'Whether the article is available for purchase' })
  isAvailable: boolean;

  @ApiProperty({ example: false, description: 'Whether the article is a preorder' })
  isPreorder: boolean;
}

export class AnalogArticleListResponseDto {
  @ApiProperty({ description: 'List of analog articles', type: [AnalogArticleListItemDto] })
  articles: AnalogArticleListItemDto[];
}