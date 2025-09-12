import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { ShoppingCart } from './shopping-cart.entity';
import { AnalogArticle } from '../../analog-articles/entities/analog-article.entity';

@Entity({ name: 'shopping_cart_item' })
@Unique(['shopping_cart_id', 'analog_article_id'])
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shopping_cart_id: number;

  @Column()
  analog_article_id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  discount_applied: number;

  @Column({ type: 'integer', nullable: true })
  cd_promotion_id: number | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => ShoppingCart, (cart) => cart.items)
  @JoinColumn({ name: 'shopping_cart_id' })
  cart: ShoppingCart;

  @ManyToOne(() => AnalogArticle)
  @JoinColumn({ name: 'analog_article_id' })
  article: AnalogArticle;

  // Computed properties
  get total_price(): number {
    return (this.unit_price * this.quantity) - this.discount_applied;
  }
}