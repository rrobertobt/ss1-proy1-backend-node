import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsString, 
  IsNumber, 
  IsInt, 
  IsBoolean, 
  IsOptional, 
  IsDateString, 
  IsUrl, 
  Min, 
  IsIn,
  IsObject
} from 'class-validator';

export class CreateAnalogArticleDto {
  @ApiProperty({
    example: 'Abbey Road',
    description: 'The title of the analog article',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the artist',
  })
  @IsInt()
  @Min(1)
  readonly artist_id: number;

  @ApiProperty({
    example: 29.99,
    description: 'The price of the analog article',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly price: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the currency',
  })
  @IsInt()
  @Min(1)
  readonly currency_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the music genre',
  })
  @IsInt()
  @Min(1)
  readonly music_genre_id: number;

  @ApiProperty({
    example: '1969-09-26',
    description: 'The release date of the article',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  readonly release_date?: string;

  @ApiProperty({
    example: 'The Beatles eleventh studio album',
    description: 'Description of the analog article',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    example: '12 x 12 inches',
    description: 'Dimensions of the article',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly dimensions?: string;

  @ApiProperty({
    example: 180,
    description: 'Weight in grams',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly weight_grams?: number;

  @ApiProperty({
    example: '194397215915',
    description: 'Barcode of the article',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly barcode?: string;

  @ApiProperty({
    example: 50,
    description: 'Current stock quantity',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly stock_quantity?: number = 0;

  @ApiProperty({
    example: 5,
    description: 'Minimum stock level',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly min_stock_level?: number = 5;

  @ApiProperty({
    example: 100,
    description: 'Maximum stock level',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly max_stock_level?: number = 100;

  @ApiProperty({
    example: true,
    description: 'Whether the article is available for purchase',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_available?: boolean = true;

  @ApiProperty({
    example: false,
    description: 'Whether the article is a preorder',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_preorder?: boolean = false;

  @ApiProperty({
    example: '2024-12-25',
    description: 'Preorder release date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  readonly preorder_release_date?: string;

  @ApiProperty({
    example: '2024-12-20',
    description: 'Preorder end date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  readonly preorder_end_date?: string;

  @ApiProperty({
    example: 'https://example.com/images/abbey-road.jpg',
    description: 'URL of the article image',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  readonly image_url?: string;

  @ApiProperty({
    example: 'vinyl',
    description: 'Type of analog article (cd, vinyl, or cassette)',
    enum: ['cd', 'vinyl', 'cassette'],
  })
  @IsString()
  @IsIn(['cd', 'vinyl', 'cassette'])
  readonly type: 'cd' | 'vinyl' | 'cassette';

  @ApiProperty({
    description: `Type-specific details based on the type field:
    
    For CD type:
    - disc_count (optional): Number of discs (default: 1)
    - has_bonus_content (optional): Whether has bonus content (default: false)
    - is_remastered (optional): Whether is remastered (default: false)
    
    For Vinyl type:
    - vinyl_category_id (required): ID of vinyl category
    - vinyl_special_edition_id (optional): ID of special edition
    - rpm (optional): RPM speed, 33 or 45 (default: 33)
    - is_limited_edition (optional): Whether is limited edition (default: false)
    - remaining_limited_stock (optional): Remaining stock if limited edition
    
    For Cassette type:
    - cassette_category_id (required): ID of cassette category
    - brand (optional): Brand name
    - is_chrome_tape (optional): Whether is chrome tape (default: false)`,
    examples: {
      cd: {
        summary: 'CD type details',
        value: {
          disc_count: 2,
          has_bonus_content: true,
          is_remastered: false
        }
      },
      vinyl: {
        summary: 'Vinyl type details',
        value: {
          vinyl_category_id: 1,
          vinyl_special_edition_id: 2,
          rpm: 33,
          is_limited_edition: true,
          remaining_limited_stock: 100
        }
      },
      cassette: {
        summary: 'Cassette type details',
        value: {
          cassette_category_id: 1,
          brand: "TDK",
          is_chrome_tape: true
        }
      }
    }
  })
  @IsObject()
  readonly type_details: any;
}