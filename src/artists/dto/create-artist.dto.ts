import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl, IsDateString, IsInt } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'The Beatles', description: 'The name of the artist or band' })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 'English rock band formed in Liverpool in 1960', 
    description: 'Biography or description of the artist',
    required: false
  })
  @IsString()
  @IsOptional()
  biography?: string;

  @ApiProperty({ 
    example: '1960-08-01', 
    description: 'Date when the band was formed or artist was born',
    required: false
  })
  @IsDateString()
  @IsOptional()
  formation_date?: string;

  @ApiProperty({ 
    example: '1960-08-01', 
    description: 'Date when the artist started their career',
    required: false
  })
  @IsDateString()
  @IsOptional()
  career_start_date?: string;

  @ApiProperty({ example: 1, description: 'The ID of the country this artist is from' })
  @IsInt()
  @IsOptional()
  country_id?: number;

  @ApiProperty({ example: true, description: 'Whether this artist is a band or solo artist' })
  @IsBoolean()
  @IsOptional()
  is_band?: boolean;

  @ApiProperty({ 
    example: 'https://www.thebeatles.com', 
    description: 'Official website of the artist',
    required: false
  })
  @IsUrl()
  @IsOptional()
  website?: string;
}