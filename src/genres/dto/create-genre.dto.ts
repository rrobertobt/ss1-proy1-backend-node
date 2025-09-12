import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    example: 'Rock Alternativo',
    description: 'The name of the music genre',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'Subgenero del rock con influencias alternativas',
    description: 'Description of the music genre',
  })
  @IsString()
  readonly description?: string;
}