import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinylCategory } from '../entities/vinyl-category.entity';
import { VinylCategoryResponseDto } from '../dto/vinyl-category-response.dto';

@Injectable()
export class VinylCategoryService {
  constructor(
    @InjectRepository(VinylCategory)
    private readonly vinylCategoryRepository: Repository<VinylCategory>,
  ) {}

  async findAll(): Promise<VinylCategoryResponseDto[]> {
    const vinylCategories = await this.vinylCategoryRepository.find();
    return vinylCategories.map(category => this.toResponseDto(category));
  }

  private toResponseDto(category: VinylCategory): VinylCategoryResponseDto {
    return {
      id: category.id,
      size: category.size,
      description: category.description,
      typical_rpm: category.typical_rpm,
    };
  }
}