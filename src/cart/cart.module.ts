import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AnalogArticle } from '../analog-articles/entities/analog-article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCart,
      CartItem,
      AnalogArticle,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}