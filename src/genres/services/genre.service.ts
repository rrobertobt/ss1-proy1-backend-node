import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { GenreResponseDto } from '../dto/genre-response.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<GenreResponseDto> {
    const existingGenre = await this.genreRepository.findOne({
      where: { name: createGenreDto.name }
    });

    if (existingGenre) {
      throw new ConflictException('A genre with this name already exists');
    }

    const genre = this.genreRepository.create(createGenreDto);
    const savedGenre = await this.genreRepository.save(genre);
    return this.toResponseDto(savedGenre);
  }

  async findAll(): Promise<GenreResponseDto[]> {
    const genres = await this.genreRepository.find();
    return genres.map(genre => this.toResponseDto(genre));
  }

  private toResponseDto(genre: Genre): GenreResponseDto {
    return {
      id: genre.id,
      name: genre.name,
      description: genre.description,
    };
  }
}