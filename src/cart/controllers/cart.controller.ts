import { 
  Controller, 
  Post, 
  Get,
  Delete,
  Body, 
  Param,
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiBody
} from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { CartItemCreatedResponseDto } from '../dto/cart-item-response.dto';
import { ShoppingCartResponseDto } from '../dto/shopping-cart-response.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CUSTOMER)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('items')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Add item to shopping cart',
    description: 'Adds an item to the user\'s shopping cart. If no cart exists for the user, one will be created automatically. If the item already exists in the cart, the quantity will be updated.'
  })
  @ApiBody({ 
    type: CreateCartItemDto,
    description: 'The item details to add to cart'
  })
  @ApiResponse({
    status: 200,
    description: 'Item successfully added to cart.',
    type: CartItemCreatedResponseDto,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            cart_id: {
              type: 'number',
              example: 1,
              description: 'The ID of the shopping cart'
            },
            item_id: {
              type: 'number',
              example: 1,
              description: 'The ID of the cart item'
            },
            article_id: {
              type: 'number',
              example: 1,
              description: 'The ID of the analog article'
            },
            quantity: {
              type: 'number',
              example: 1,
              description: 'The quantity of the article in the cart'
            },
            unit_price: {
              type: 'number',
              example: 29.99,
              description: 'The unit price of the article'
            },
            total_price: {
              type: 'number',
              example: 29.99,
              description: 'The total price for this item (unit price * quantity - discount)'
            },
            new_cart_total: {
              type: 'number',
              example: 59.98,
              description: 'The new total amount for the entire cart'
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data, insufficient stock, or article not available.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 400 },
        message: { 
          type: 'string', 
          example: 'Insufficient stock. Available: 5, Requested: 10' 
        },
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
    description: 'Article not found.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { 
          type: 'string', 
          example: 'Article with ID 1 not found' 
        },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async addItemToCart(
    @Request() req: any,
    @Body() createCartItemDto: CreateCartItemDto
  ): Promise<CartItemCreatedResponseDto> {
    // Debug logging - remove this in production
    console.log('User from request:', JSON.stringify(req.user, null, 2));
    
    const userId = req.user.id;
    const data = await this.cartService.addItemToCart(userId, createCartItemDto);
    
    return { data };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Get shopping cart',
    description: 'Retrieves the user\'s shopping cart with all items and their details.'
  })
  @ApiResponse({
    status: 200,
    description: 'Shopping cart retrieved successfully.',
    type: ShoppingCartResponseDto,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
              description: 'The ID of the shopping cart'
            },
            total_items: {
              type: 'number',
              example: 3,
              description: 'The total number of items in the cart'
            },
            subtotal: {
              type: 'number',
              example: 89.97,
              description: 'The subtotal of all items in the cart'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                    example: 15,
                    description: 'The ID of the cart item'
                  },
                  article: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'number',
                        example: 5,
                        description: 'The ID of the analog article'
                      },
                      title: {
                        type: 'string',
                        example: 'Abbey Road',
                        description: 'The title of the article'
                      },
                      artist: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'number',
                            example: 3,
                            description: 'The ID of the artist'
                          },
                          name: {
                            type: 'string',
                            example: 'The Beatles',
                            description: 'The name of the artist'
                          }
                        }
                      },
                      type: {
                        type: 'string',
                        example: 'vinyl',
                        enum: ['cd', 'vinyl', 'cassette'],
                        description: 'The type of analog article'
                      },
                      price: {
                        type: 'number',
                        example: 29.99,
                        description: 'The price of the article'
                      },
                      currency: {
                        type: 'object',
                        properties: {
                          code: {
                            type: 'string',
                            example: 'USD',
                            description: 'The currency code'
                          },
                          symbol: {
                            type: 'string',
                            example: '$',
                            description: 'The currency symbol'
                          }
                        }
                      },
                      image_url: {
                        type: 'string',
                        example: 'https://example.com/image.jpg',
                        description: 'The image URL of the article',
                        nullable: true
                      },
                      is_available: {
                        type: 'boolean',
                        example: true,
                        description: 'Whether the article is available for purchase'
                      },
                      is_preorder: {
                        type: 'boolean',
                        example: false,
                        description: 'Whether the article is available for preorder'
                      },
                      stock_quantity: {
                        type: 'number',
                        example: 15,
                        description: 'The current stock quantity'
                      }
                    }
                  },
                  quantity: {
                    type: 'number',
                    example: 2,
                    description: 'The quantity of the article in the cart'
                  },
                  unit_price: {
                    type: 'number',
                    example: 29.99,
                    description: 'The unit price of the article'
                  },
                  discount_applied: {
                    type: 'number',
                    example: 0,
                    description: 'The discount applied to this item'
                  },
                  total_price: {
                    type: 'number',
                    example: 59.98,
                    description: 'The total price for this item'
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
    description: 'Shopping cart not found or empty.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { 
          type: 'string', 
          example: 'Shopping cart not found' 
        },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async getShoppingCart(
    @Request() req: any
  ): Promise<ShoppingCartResponseDto> {
    const userId = req.user.id;
    const cartData = await this.cartService.getCartWithItemsForUser(userId);
    
    if (!cartData) {
      throw new NotFoundException('Shopping cart not found');
    }
    
    return { data: cartData };
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Remove item from shopping cart',
    description: 'Removes a specific item from the user\'s shopping cart by item ID.'
  })
  @ApiResponse({
    status: 204,
    description: 'Item successfully removed from cart.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid item ID.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid item ID' },
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
    description: 'Cart item not found.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { 
          type: 'string', 
          example: 'Cart item not found' 
        },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async removeItemFromCart(
    @Request() req: any,
    @Param('id') itemId: string
  ): Promise<void> {
    const userId = req.user.id;
    const itemIdNumber = parseInt(itemId, 10);
    
    if (isNaN(itemIdNumber) || itemIdNumber <= 0) {
      throw new BadRequestException('Invalid item ID');
    }
    
    await this.cartService.removeItemFromCart(userId, itemIdNumber);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Clear shopping cart',
    description: 'Removes all items from the user\'s shopping cart.'
  })
  @ApiResponse({
    status: 204,
    description: 'Cart successfully cleared.'
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
    description: 'Shopping cart not found.',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { 
          type: 'string', 
          example: 'Shopping cart not found' 
        },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async clearCart(
    @Request() req: any
  ): Promise<void> {
    const userId = req.user.id;
    await this.cartService.clearCart(userId);
  }
}