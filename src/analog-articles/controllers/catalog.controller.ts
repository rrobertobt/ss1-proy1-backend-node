import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalogArticleService } from '../services/analog-article.service';
import { AnalogArticleListResponseDto } from '../dto/analog-article-list-response.dto';
import { VinylCategoryService } from '../services/vinyl-category.service';
import { VinylSpecialEditionService } from '../services/vinyl-special-edition.service';
import { CassetteCategoryService } from '../services/cassette-category.service';
import { VinylCategoryResponseDto } from '../dto/vinyl-category-response.dto';
import { VinylSpecialEditionResponseDto } from '../dto/vinyl-special-edition-response.dto';
import { CassetteCategoryResponseDto } from '../dto/cassette-category-response.dto';

@ApiTags('Catalog Articles')
@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly analogArticleService: AnalogArticleService,
    private readonly vinylCategoryService: VinylCategoryService,
    private readonly vinylSpecialEditionService: VinylSpecialEditionService,
    private readonly cassetteCategoryService: CassetteCategoryService,
  ) {}

  @Get('articles')
  @ApiOperation({ 
    summary: 'Get all analog articles',
    description: 'Retrieves a list of all analog articles with their artist, genre, and currency information.'
  })
  @ApiResponse({
    status: 200,
    description: 'List of analog articles retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            articles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 3 },
                  title: { type: 'string', example: 'El tercer disco de el gordo' },
                  artist: {
                    type: 'object',
                    properties: {
                      id: { type: 'number', example: 1 },
                      name: { type: 'string', example: 'El Gordo' }
                    }
                  },
                  type: { type: 'string', example: 'cd', enum: ['cd', 'vinyl', 'cassette'] },
                  price: { type: 'number', example: 29.99 },
                  currency: {
                    type: 'object',
                    properties: {
                      code: { type: 'string', example: 'GTQ' },
                      symbol: { type: 'string', example: 'Q' }
                    }
                  },
                  genre: {
                    type: 'object',
                    properties: {
                      id: { type: 'number', example: 1 },
                      name: { type: 'string', example: 'Rock' }
                    }
                  },
                  imageUrl: { type: 'string', example: 'https://example.com/images/abbey-road.jpg', nullable: true },
                  averageRating: { type: 'number', example: 0 },
                  totalRatings: { type: 'number', example: 0 },
                  stockQuantity: { type: 'number', example: 50 },
                  isAvailable: { type: 'boolean', example: true },
                  isPreorder: { type: 'boolean', example: false }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing authentication token.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  async findAll(): Promise<{ data: AnalogArticleListResponseDto }> {
    const result = await this.analogArticleService.findAll();
    return { data: result };
  }

  @Get('vinyl-categories')
  @ApiOperation({ 
    summary: 'Get all vinyl categories',
    description: 'Retrieves a list of all vinyl categories with their details.'
  })
  @ApiResponse({
    status: 200,
    description: 'List of vinyl categories retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/VinylCategoryResponseDto'
          }
        }
      }
    }
  })
  async findAllVinylCategories(): Promise<{ data: VinylCategoryResponseDto[] }> {
    const vinylCategories = await this.vinylCategoryService.findAll();
    return { data: vinylCategories };
  }

  @Get('vinyl-special-editions')
  @ApiOperation({ 
    summary: 'Get all vinyl special editions',
    description: 'Retrieves a list of all vinyl special editions with their details.'
  })
  @ApiResponse({
    status: 200,
    description: 'List of vinyl special editions retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/VinylSpecialEditionResponseDto'
          }
        }
      }
    }
  })
  async findAllVinylSpecialEditions(): Promise<{ data: VinylSpecialEditionResponseDto[] }> {
    const vinylSpecialEditions = await this.vinylSpecialEditionService.findAll();
    return { data: vinylSpecialEditions };
  }

  @Get('cassette-categories')
  @ApiOperation({ 
    summary: 'Get all cassette categories',
    description: 'Retrieves a list of all cassette categories with their details.'
  })
  @ApiResponse({
    status: 200,
    description: 'List of cassette categories retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/CassetteCategoryResponseDto'
          }
        }
      }
    }
  })
  async findAllCassetteCategories(): Promise<{ data: CassetteCategoryResponseDto[] }> {
    const cassetteCategories = await this.cassetteCategoryService.findAll();
    return { data: cassetteCategories };
  }
}