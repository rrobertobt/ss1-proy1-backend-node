import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AnalogArticleService } from '../services/analog-article.service';
import { CreateAnalogArticleDto } from '../dto/create-analog-article.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Admin - Catalog Articles')
@Controller('admin/catalog')
export class AdminCatalogController {
  constructor(private readonly analogArticleService: AnalogArticleService) {}

  @Post('articles')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Create a new analog article (Admin only)',
    description: 'Creates a new analog article (CD, Vinyl, or Cassette) with type-specific details. The type field determines which product will be created alongside the main analog article record.'
  })
  @ApiBody({
    type: CreateAnalogArticleDto,
    examples: {
      cd: {
        summary: 'Create CD Article',
        description: 'Example of creating a CD analog article',
        value: {
          title: "Abbey Road",
          artist_id: 1,
          price: 29.99,
          currency_id: 1,
          music_genre_id: 1,
          release_date: "1969-09-26",
          description: "The Beatles eleventh studio album",
          dimensions: "4.7 x 4.7 inches",
          weight_grams: 100,
          barcode: "194397215915",
          stock_quantity: 50,
          min_stock_level: 5,
          max_stock_level: 100,
          is_available: true,
          is_preorder: false,
          image_url: "https://example.com/images/abbey-road.jpg",
          type: "cd",
          type_details: {
            disc_count: 2,
            has_bonus_content: true,
            is_remastered: false
          }
        }
      },
      vinyl: {
        summary: 'Create Vinyl Article',
        description: 'Example of creating a Vinyl analog article',
        value: {
          title: "Dark Side of the Moon",
          artist_id: 2,
          price: 45.99,
          currency_id: 1,
          music_genre_id: 2,
          release_date: "1973-03-01",
          description: "Pink Floyd's masterpiece",
          dimensions: "12 x 12 inches",
          weight_grams: 200,
          barcode: "194397215916",
          stock_quantity: 25,
          min_stock_level: 3,
          max_stock_level: 50,
          is_available: true,
          is_preorder: false,
          image_url: "https://example.com/images/dark-side.jpg",
          type: "vinyl",
          type_details: {
            vinyl_category_id: 1,
            vinyl_special_edition_id: 2,
            rpm: 33,
            is_limited_edition: true,
            remaining_limited_stock: 100
          }
        }
      },
      cassette: {
        summary: 'Create Cassette Article',
        description: 'Example of creating a Cassette analog article',
        value: {
          title: "Thriller",
          artist_id: 3,
          price: 19.99,
          currency_id: 1,
          music_genre_id: 3,
          release_date: "1982-11-30",
          description: "Michael Jackson's iconic album",
          dimensions: "4 x 2.5 inches",
          weight_grams: 50,
          barcode: "194397215917",
          stock_quantity: 30,
          min_stock_level: 5,
          max_stock_level: 80,
          is_available: true,
          is_preorder: false,
          image_url: "https://example.com/images/thriller.jpg",
          type: "cassette",
          type_details: {
            cassette_category_id: 1,
            brand: "TDK",
            is_chrome_tape: true
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'The analog article has been successfully created.',
    schema: {
      type: 'object',
      properties: {},
      example: {}
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Invalid input data or validation errors.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { 
          type: 'array', 
          items: { type: 'string' },
          example: ['title should not be empty', 'price must be a positive number']
        },
        error: { type: 'string', example: 'Bad Request' }
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
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Requires admin role.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Forbidden resource' }
      }
    }
  })
  async create(@Body() createAnalogArticleDto: CreateAnalogArticleDto): Promise<{}> {
    await this.analogArticleService.create(createAnalogArticleDto);
    return {};
  }
}