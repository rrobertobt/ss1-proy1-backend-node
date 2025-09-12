import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GenreService } from '../services/genre.service';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { GenreResponseDto } from '../dto/genre-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new music genre (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
    type: GenreResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  @ApiResponse({ status: 409, description: 'Conflict - A genre with this name already exists.' })
  async create(@Body() createGenreDto: CreateGenreDto): Promise<{ data: GenreResponseDto }> {
    const genre = await this.genreService.create(createGenreDto);
    return { data: genre };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all music genres (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all music genres.',
    type: GenreResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  async findAll(): Promise<{ data: GenreResponseDto[] }> {
    const genres = await this.genreService.findAll();
    return { data: genres };
  }
}