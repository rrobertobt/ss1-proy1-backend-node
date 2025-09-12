import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinylSpecialEdition } from '../entities/vinyl-special-edition.entity';
import { VinylSpecialEditionResponseDto } from '../dto/vinyl-special-edition-response.dto';

@Injectable()
export class VinylSpecialEditionService {
  constructor(
    @InjectRepository(VinylSpecialEdition)
    private readonly vinylSpecialEditionRepository: Repository<VinylSpecialEdition>,
  ) {}

  async findAll(): Promise<VinylSpecialEditionResponseDto[]> {
    const vinylSpecialEditions = await this.vinylSpecialEditionRepository.find();
    return vinylSpecialEditions.map(edition => this.toResponseDto(edition));
  }

  private toResponseDto(edition: VinylSpecialEdition): VinylSpecialEditionResponseDto {
    return {
      id: edition.id,
      name: edition.name,
      color: edition.color,
      material_description: edition.material_description,
      extra_content: edition.extra_content,
      is_limited: edition.is_limited,
      limited_quantity: edition.limited_quantity,
    };
  }
}