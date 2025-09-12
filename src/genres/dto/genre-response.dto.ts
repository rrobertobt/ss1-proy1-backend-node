import { ApiProperty } from '@nestjs/swagger';

export class GenreResponseDto {
  @ApiProperty({
    example: 15,
    description: 'The unique identifier of the genre',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Rock Alternativo',
    description: 'The name of the music genre',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Subgenero del rock con influencias alternativas',
    description: 'Description of the music genre',
  })
  readonly description: string | null;
}