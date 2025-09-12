import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CountriesService } from '../services/countries.service';
import { Country } from '../entities/country.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('countries')
@Controller('catalogs/countries')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: 200,
    description: 'List of all countries',
    type: [Country],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }
}