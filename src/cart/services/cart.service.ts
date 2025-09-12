import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { AnalogArticle } from '../../analog-articles/entities/analog-article.entity';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { CartItemResponseDto } from '../dto/cart-item-response.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(AnalogArticle)
    private readonly analogArticleRepository: Repository<AnalogArticle>,
    private readonly dataSource: DataSource,
  ) {}

  async addItemToCart(userId: number, createCartItemDto: CreateCartItemDto): Promise<CartItemResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if article exists and is available
      const article = await this.analogArticleRepository.findOne({
        where: { id: createCartItemDto.article_id },
      });

      if (!article) {
        throw new NotFoundException(`Article with ID ${createCartItemDto.article_id} not found`);
      }

      if (!article.is_available) {
        throw new BadRequestException(`Article "${article.title}" is not available`);
      }

      if (article.stock_quantity < createCartItemDto.quantity) {
        throw new BadRequestException(
          `Insufficient stock. Available: ${article.stock_quantity}, Requested: ${createCartItemDto.quantity}`
        );
      }

      // Find or create shopping cart for user
      let cart = await this.shoppingCartRepository.findOne({
        where: { user_id: userId },
      });

      if (!cart) {
        cart = this.shoppingCartRepository.create({
          user_id: userId,
          total_items: 0,
          subtotal: 0,
        });
        cart = await queryRunner.manager.save(cart);
      }

      // Check if item already exists in cart
      const existingCartItem = await this.cartItemRepository.findOne({
        where: { 
          shopping_cart_id: cart.id, 
          analog_article_id: createCartItemDto.article_id 
        },
      });

      let cartItem: CartItem;
      
      if (existingCartItem) {
        // Update existing item quantity
        const newQuantity = existingCartItem.quantity + createCartItemDto.quantity;
        
        if (article.stock_quantity < newQuantity) {
          throw new BadRequestException(
            `Insufficient stock. Available: ${article.stock_quantity}, Total requested: ${newQuantity}`
          );
        }

        existingCartItem.quantity = newQuantity;
        existingCartItem.updated_at = new Date();
        cartItem = await queryRunner.manager.save(existingCartItem);
      } else {
        // Create new cart item
        cartItem = this.cartItemRepository.create({
          shopping_cart_id: cart.id,
          analog_article_id: createCartItemDto.article_id,
          quantity: createCartItemDto.quantity,
          unit_price: article.price,
          discount_applied: 0,
        });
        cartItem = await queryRunner.manager.save(cartItem);
      }

      // Update cart totals
      const cartItems = await queryRunner.manager.find(CartItem, {
        where: { shopping_cart_id: cart.id },
      });

      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);

      cart.total_items = totalItems;
      cart.subtotal = subtotal;
      cart.updated_at = new Date();
      const updatedCart = await queryRunner.manager.save(cart);

      await queryRunner.commitTransaction();

      return {
        cart_id: cart.id,
        item_id: cartItem.id,
        article_id: cartItem.analog_article_id,
        quantity: cartItem.quantity,
        unit_price: cartItem.unit_price,
        total_price: cartItem.total_price,
        new_cart_total: updatedCart.subtotal,
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getCartByUserId(userId: number): Promise<ShoppingCart | null> {
    return this.shoppingCartRepository.findOne({
      where: { user_id: userId },
      relations: ['items', 'items.article', 'items.article.artist', 'items.article.currency'],
    });
  }

  async getCartWithItemsForUser(userId: number) {
    const cart = await this.shoppingCartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.items', 'items')
      .leftJoinAndSelect('items.article', 'article')
      .leftJoinAndSelect('article.artist', 'artist')
      .leftJoinAndSelect('article.currency', 'currency')
      .leftJoin('cd', 'cd', 'cd.analog_article_id = article.id')
      .leftJoin('vinyl', 'vinyl', 'vinyl.analog_article_id = article.id')
      .leftJoin('cassette', 'cassette', 'cassette.analog_article_id = article.id')
      .addSelect(`
        CASE 
          WHEN cd.id IS NOT NULL THEN 'cd'
          WHEN vinyl.id IS NOT NULL THEN 'vinyl'
          WHEN cassette.id IS NOT NULL THEN 'cassette'
          ELSE 'unknown'
        END as article_type
      `)
      .where('cart.user_id = :userId', { userId })
      .getOne();

    if (!cart) {
      return null;
    }

    // Transform the data to match the expected response format
    const transformedItems = cart.items.map(item => ({
      id: item.id,
      article: {
        id: item.article.id,
        title: item.article.title,
        artist: {
          id: item.article.artist.id,
          name: item.article.artist.name,
        },
        type: (item.article as any).article_type || 'unknown',
        price: item.article.price,
        currency: {
          code: item.article.currency.code,
          symbol: item.article.currency.symbol,
        },
        image_url: item.article.image_url,
        is_available: item.article.is_available,
        is_preorder: item.article.is_preorder,
        stock_quantity: item.article.stock_quantity,
      },
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount_applied: item.discount_applied,
      total_price: item.total_price,
    }));

    return {
      id: cart.id,
      total_items: cart.total_items,
      subtotal: cart.subtotal,
      items: transformedItems,
    };
  }

  async updateCartItemQuantity(userId: number, itemId: number, newQuantity: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user_id: userId },
      });

      if (!cart) {
        throw new NotFoundException('Shopping cart not found');
      }

      const cartItem = await this.cartItemRepository.findOne({
        where: { id: itemId, shopping_cart_id: cart.id },
        relations: ['article'],
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      // Check if there's enough stock for the new quantity
      if (cartItem.article.stock_quantity < newQuantity) {
        throw new BadRequestException(
          `Insufficient stock. Available: ${cartItem.article.stock_quantity}, Requested: ${newQuantity}`
        );
      }

      // Update the cart item quantity
      cartItem.quantity = newQuantity;
      cartItem.updated_at = new Date();
      await queryRunner.manager.save(cartItem);

      // Update cart totals
      const cartItems = await queryRunner.manager.find(CartItem, {
        where: { shopping_cart_id: cart.id },
      });

      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);

      cart.total_items = totalItems;
      cart.subtotal = subtotal;
      cart.updated_at = new Date();
      await queryRunner.manager.save(cart);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async removeItemFromCart(userId: number, itemId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user_id: userId },
      });

      if (!cart) {
        throw new NotFoundException('Shopping cart not found');
      }

      const cartItem = await this.cartItemRepository.findOne({
        where: { id: itemId, shopping_cart_id: cart.id },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      await queryRunner.manager.remove(cartItem);

      // Update cart totals
      const remainingItems = await queryRunner.manager.find(CartItem, {
        where: { shopping_cart_id: cart.id },
      });

      const totalItems = remainingItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = remainingItems.reduce((sum, item) => sum + item.total_price, 0);

      cart.total_items = totalItems;
      cart.subtotal = subtotal;
      cart.updated_at = new Date();
      await queryRunner.manager.save(cart);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async clearCart(userId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user_id: userId },
      });

      if (!cart) {
        throw new NotFoundException('Shopping cart not found');
      }

      await queryRunner.manager.delete(CartItem, { shopping_cart_id: cart.id });

      cart.total_items = 0;
      cart.subtotal = 0;
      cart.updated_at = new Date();
      await queryRunner.manager.save(cart);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}