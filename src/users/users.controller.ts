import { Controller, Post, Get, Put, Body, Query, Param, UseGuards, Request, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserAddressesResponseDto } from './dto/user-address-response.dto';
import { UserResponseDto, PaginatedUsersResponseDto } from './dto/user-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'The user has been successfully created.',
    type: CreateUserDto 
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'The admin user has been successfully created.',
    type: UserResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, Role.ADMIN);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users with pagination (Admin only)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of users',
    type: PaginatedUsersResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  async findAll(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const { data: users, total } = await this.userService.findAll(page, limit);
    
    return {
      data: users.map(user => new UserResponseDto(user)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  @Post('addresses')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user address' })
  @ApiResponse({
    status: 201,
    description: 'The user address has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 201 },
        message: { type: 'string', example: 'User address created successfully' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid input data' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing authentication token.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async createAddress(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    await this.userService.createUserAddress(userId, createUserAddressDto);
  }

  @Get('addresses')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user addresses' })
  @ApiResponse({
    status: 200,
    description: 'User addresses retrieved successfully.',
    type: UserAddressesResponseDto,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            addresses: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                    example: 1,
                    description: 'The unique identifier of the user address'
                  },
                  address_line1: {
                    type: 'string',
                    example: '123 Main Street',
                    description: 'The first line of the address'
                  },
                  address_line2: {
                    type: 'string',
                    example: 'Apt 4B',
                    description: 'The second line of the address',
                    nullable: true
                  },
                  city: {
                    type: 'string',
                    example: 'Guatemala City',
                    description: 'The city of the address'
                  },
                  state: {
                    type: 'string',
                    example: 'Guatemala',
                    description: 'The state or province of the address',
                    nullable: true
                  },
                  postal_code: {
                    type: 'string',
                    example: '01001',
                    description: 'The postal code of the address',
                    nullable: true
                  },
                  country: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'number',
                        example: 1,
                        description: 'The unique identifier of the country'
                      },
                      name: {
                        type: 'string',
                        example: 'Guatemala',
                        description: 'The name of the country'
                      }
                    }
                  },
                  is_default: {
                    type: 'boolean',
                    example: false,
                    description: 'Whether this is the default address'
                  },
                  is_billing_default: {
                    type: 'boolean',
                    example: false,
                    description: 'Whether this is the default billing address'
                  },
                  is_shipping_default: {
                    type: 'boolean',
                    example: false,
                    description: 'Whether this is the default shipping address'
                  }
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
    description: 'Unauthorized - invalid or missing authentication token.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async getUserAddresses(
    @Request() req: any,
  ): Promise<UserAddressesResponseDto> {
    const userId = req.user.id;
    const addresses = await this.userService.getUserAddresses(userId);
    
    const formattedAddresses = addresses.map(address => ({
      id: address.id,
      address_line1: address.address_line_1,
      address_line2: address.address_line_2,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: {
        id: address.country.id,
        name: address.country.name
      },
      is_default: address.is_default,
      is_billing_default: address.is_billing_default,
      is_shipping_default: address.is_shipping_default
    }));

    return {
      data: {
        addresses: formattedAddresses
      }
    };
  }

  @Put('addresses/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user address' })
  @ApiResponse({
    status: 204,
    description: 'The user address has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data or invalid address ID.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid address ID' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing authentication token.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found or does not belong to the user.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Address not found or does not belong to the user' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async updateAddress(
    @Param('id') addressId: string,
    @Body() updateUserAddressDto: CreateUserAddressDto,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    const addressIdNumber = parseInt(addressId, 10);
    
    if (isNaN(addressIdNumber) || addressIdNumber <= 0) {
      throw new BadRequestException('Invalid address ID');
    }
    
    await this.userService.updateUserAddress(userId, addressIdNumber, updateUserAddressDto);
  }
}
