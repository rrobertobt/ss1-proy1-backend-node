import { Controller, Get } from '@nestjs/common';
import { GenderService } from '../services/gender.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Gender } from '../entities/gender.entity';

@ApiTags('genders')
@Controller('genders')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genders' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all genders',
    type: Gender,
    isArray: true
  })
  async findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }
}