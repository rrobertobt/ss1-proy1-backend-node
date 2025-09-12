import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new artist (Admin only)' })
  @ApiResponse({ 
    status: 201, 
    description: 'The artist has been successfully created.',
    type: Artist 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistService.create(createArtistDto);
    return { data: artist };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all artists (Admin only)' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all artists',
    type: Artist,
    isArray: true 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  async findAll() {
    const artists = await this.artistService.findAll();
    return { data: artists };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an artist by id (Admin only)' })
  @ApiResponse({ 
    status: 200, 
    description: 'The artist has been found',
    type: Artist 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async findOne(@Param('id') id: string) {
    const artist = await this.artistService.findOne(+id);
    return { data: artist };
  }
}