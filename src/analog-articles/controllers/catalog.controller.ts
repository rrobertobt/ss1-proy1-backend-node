import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalogArticleService } from '../services/analog-article.service';
import { AnalogArticleListResponseDto } from '../dto/analog-article-list-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Catalog Articles')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly analogArticleService: AnalogArticleService) {}

  @Get('articles')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
}