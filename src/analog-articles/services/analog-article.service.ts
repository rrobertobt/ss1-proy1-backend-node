import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AnalogArticle } from '../entities/analog-article.entity';
import { Cd } from '../entities/cd.entity';
import { Vinyl } from '../entities/vinyl.entity';
import { Cassette } from '../entities/cassette.entity';
import { CreateAnalogArticleDto } from '../dto/create-analog-article.dto';
import { AnalogArticleResponseDto } from '../dto/analog-article-response.dto';
import { AnalogArticleListResponseDto, AnalogArticleListItemDto } from '../dto/analog-article-list-response.dto';

@Injectable()
export class AnalogArticleService {
  constructor(
    @InjectRepository(AnalogArticle)
    private readonly analogArticleRepository: Repository<AnalogArticle>,
    @InjectRepository(Cd)
    private readonly cdRepository: Repository<Cd>,
    @InjectRepository(Vinyl)
    private readonly vinylRepository: Repository<Vinyl>,
    @InjectRepository(Cassette)
    private readonly cassetteRepository: Repository<Cassette>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createAnalogArticleDto: CreateAnalogArticleDto): Promise<AnalogArticleResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate preorder logic
      this.validatePreorderDates(createAnalogArticleDto);

      // Validate type_details based on type
      this.validateTypeDetails(createAnalogArticleDto);

      // Create the analog article first
      const analogArticle = this.analogArticleRepository.create({
        title: createAnalogArticleDto.title,
        artist_id: createAnalogArticleDto.artist_id,
        price: createAnalogArticleDto.price,
        currency_id: createAnalogArticleDto.currency_id,
        music_genre_id: createAnalogArticleDto.music_genre_id,
        release_date: createAnalogArticleDto.release_date ? new Date(createAnalogArticleDto.release_date) : null,
        description: createAnalogArticleDto.description || null,
        dimensions: createAnalogArticleDto.dimensions || null,
        weight_grams: createAnalogArticleDto.weight_grams || null,
        barcode: createAnalogArticleDto.barcode || null,
        stock_quantity: createAnalogArticleDto.stock_quantity || 0,
        min_stock_level: createAnalogArticleDto.min_stock_level || 5,
        max_stock_level: createAnalogArticleDto.max_stock_level || 100,
        is_available: createAnalogArticleDto.is_available ?? true,
        is_preorder: createAnalogArticleDto.is_preorder ?? false,
        preorder_release_date: createAnalogArticleDto.preorder_release_date ? new Date(createAnalogArticleDto.preorder_release_date) : null,
        preorder_end_date: createAnalogArticleDto.preorder_end_date ? new Date(createAnalogArticleDto.preorder_end_date) : null,
        image_url: createAnalogArticleDto.image_url || null,
      });

      const savedAnalogArticle = await queryRunner.manager.save(analogArticle);

      // Create the specific product type based on the type field
      await this.createProductByType(
        queryRunner,
        savedAnalogArticle.id,
        createAnalogArticleDto.type,
        createAnalogArticleDto.type_details
      );

      await queryRunner.commitTransaction();

      return this.toResponseDto(savedAnalogArticle);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<AnalogArticleListResponseDto> {
    const articles = await this.analogArticleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.artist', 'artist')
      .leftJoinAndSelect('article.music_genre', 'genre')
      .leftJoinAndSelect('article.currency', 'currency')
      .leftJoin('cd', 'cd', 'cd.analog_article_id = article.id')
      .leftJoin('vinyl', 'vinyl', 'vinyl.analog_article_id = article.id')
      .leftJoin('cassette', 'cassette', 'cassette.analog_article_id = article.id')
      .addSelect(
        `CASE 
          WHEN cd.id IS NOT NULL THEN 'cd'
          WHEN vinyl.id IS NOT NULL THEN 'vinyl'
          WHEN cassette.id IS NOT NULL THEN 'cassette'
          ELSE 'unknown'
        END`,
        'article_type'
      )
      .getRawAndEntities();

    const listItems: AnalogArticleListItemDto[] = articles.entities.map((article, index) => {
      const raw = articles.raw[index];
      return {
        id: article.id,
        title: article.title,
        artist: {
          id: article.artist.id,
          name: article.artist.name,
        },
        type: raw.article_type,
        price: parseFloat(article.price.toString()),
        currency: {
          code: article.currency.code,
          symbol: article.currency.symbol || '',
        },
        genre: {
          id: article.music_genre.id,
          name: article.music_genre.name,
        },
        imageUrl: article.image_url,
        averageRating: parseFloat(article.average_rating.toString()),
        totalRatings: article.total_ratings,
        stockQuantity: article.stock_quantity,
        isAvailable: article.is_available,
        isPreorder: article.is_preorder,
      };
    });

    return { articles: listItems };
  }

  private validatePreorderDates(dto: CreateAnalogArticleDto): void {
    if (dto.is_preorder && !dto.preorder_release_date) {
      throw new BadRequestException('preorder_release_date is required when is_preorder is true');
    }

    if (dto.preorder_end_date && dto.preorder_release_date) {
      const endDate = new Date(dto.preorder_end_date);
      const releaseDate = new Date(dto.preorder_release_date);
      if (endDate >= releaseDate) {
        throw new BadRequestException('preorder_end_date must be before preorder_release_date');
      }
    }
  }

  private validateTypeDetails(dto: CreateAnalogArticleDto): void {
    const { type, type_details } = dto;

    if (!type_details || typeof type_details !== 'object') {
      throw new BadRequestException('type_details is required and must be an object');
    }

    switch (type) {
      case 'vinyl':
        if (!type_details.vinyl_category_id) {
          throw new BadRequestException('vinyl_category_id is required for vinyl type');
        }
        if (type_details.is_limited_edition && !type_details.remaining_limited_stock) {
          throw new BadRequestException('remaining_limited_stock is required when is_limited_edition is true');
        }
        break;

      case 'cassette':
        if (!type_details.cassette_category_id) {
          throw new BadRequestException('cassette_category_id is required for cassette type');
        }
        break;

      case 'cd':
        // CD type details are all optional, no specific validation needed
        break;

      default:
        throw new BadRequestException('Invalid type. Must be one of: cd, vinyl, cassette');
    }
  }

  private async createProductByType(
    queryRunner: any,
    analogArticleId: number,
    type: string,
    typeDetails: any
  ): Promise<void> {
    switch (type) {
      case 'cd':
        const cd = this.cdRepository.create({
          analog_article_id: analogArticleId,
          disc_count: typeDetails.disc_count || 1,
          has_bonus_content: typeDetails.has_bonus_content || false,
          is_remastered: typeDetails.is_remastered || false,
        });
        await queryRunner.manager.save(cd);
        break;

      case 'vinyl':
        const vinyl = this.vinylRepository.create({
          analog_article_id: analogArticleId,
          vinyl_category_id: typeDetails.vinyl_category_id,
          vinyl_special_edition_id: typeDetails.vinyl_special_edition_id || null,
          rpm: typeDetails.rpm || 33,
          is_limited_edition: typeDetails.is_limited_edition || false,
          remaining_limited_stock: typeDetails.remaining_limited_stock || null,
        });
        await queryRunner.manager.save(vinyl);
        break;

      case 'cassette':
        const cassette = this.cassetteRepository.create({
          analog_article_id: analogArticleId,
          cassette_category_id: typeDetails.cassette_category_id,
          brand: typeDetails.brand || null,
          is_chrome_tape: typeDetails.is_chrome_tape || false,
        });
        await queryRunner.manager.save(cassette);
        break;

      default:
        throw new BadRequestException(`Unsupported product type: ${type}`);
    }
  }

  private toResponseDto(analogArticle: AnalogArticle): AnalogArticleResponseDto {
    return {
      id: analogArticle.id,
      title: analogArticle.title,
      artist_id: analogArticle.artist_id,
      price: analogArticle.price,
      currency_id: analogArticle.currency_id,
      music_genre_id: analogArticle.music_genre_id,
      release_date: analogArticle.release_date ? analogArticle.release_date.toISOString().split('T')[0] : null,
      description: analogArticle.description,
      dimensions: analogArticle.dimensions,
      weight_grams: analogArticle.weight_grams,
      barcode: analogArticle.barcode,
      stock_quantity: analogArticle.stock_quantity,
      min_stock_level: analogArticle.min_stock_level,
      max_stock_level: analogArticle.max_stock_level,
      is_available: analogArticle.is_available,
      is_preorder: analogArticle.is_preorder,
      preorder_release_date: analogArticle.preorder_release_date ? analogArticle.preorder_release_date.toISOString().split('T')[0] : null,
      preorder_end_date: analogArticle.preorder_end_date ? analogArticle.preorder_end_date.toISOString().split('T')[0] : null,
      image_url: analogArticle.image_url,
      total_sold: analogArticle.total_sold,
      average_rating: analogArticle.average_rating,
      total_ratings: analogArticle.total_ratings,
      created_at: analogArticle.created_at,
      updated_at: analogArticle.updated_at,
    };
  }
}