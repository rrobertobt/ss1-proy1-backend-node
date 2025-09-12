import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CassetteCategory } from '../entities/cassette-category.entity';
import { CassetteCategoryResponseDto } from '../dto/cassette-category-response.dto';

@Injectable()
export class CassetteCategoryService {
  constructor(
    @InjectRepository(CassetteCategory)
    private readonly cassetteCategoryRepository: Repository<CassetteCategory>,
  ) {}

  async findAll(): Promise<CassetteCategoryResponseDto[]> {
    const cassetteCategories = await this.cassetteCategoryRepository.find();
    return cassetteCategories.map(category => this.toResponseDto(category));
  }

  private toResponseDto(category: CassetteCategory): CassetteCategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      discount_percentage: category.discount_percentage,
      description: category.description,
    };
  }
}