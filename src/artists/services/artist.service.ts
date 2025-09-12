import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find({
      relations: ['country'],
      select: {
        country: {
          id: true,
          name: true
        }
      }
    });
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['country'],
      select: {
        country: {
          id: true,
          name: true
        }
      }
    });
    
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    
    return artist;
  }
}