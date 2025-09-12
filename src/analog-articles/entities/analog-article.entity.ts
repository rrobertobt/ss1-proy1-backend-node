import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '../../artists/entities/artist.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { Currency } from '../../common/entities/currency.entity';

@Entity({ name: 'analog_article' })
export class AnalogArticle {
  @ApiProperty({ example: 1, description: 'The unique identifier of the analog article' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Abbey Road', description: 'The title of the analog article' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 1, description: 'The ID of the artist' })
  @Column({ type: 'integer', name: 'artist_id' })
  artist_id: number;

  @ApiProperty({ example: 29.99, description: 'The price of the analog article' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ example: 1, description: 'The ID of the currency' })
  @Column({ type: 'integer', name: 'currency_id' })
  currency_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the music genre' })
  @Column({ type: 'integer', name: 'music_genre_id' })
  music_genre_id: number;

  @ApiProperty({ example: '1969-09-26', description: 'The release date of the article', nullable: true })
  @Column({ type: 'date', nullable: true, name: 'release_date' })
  release_date: Date | null;

  @ApiProperty({ 
    example: 'The Beatles eleventh studio album', 
    description: 'Description of the analog article',
    nullable: true
  })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ example: '12 x 12 inches', description: 'Dimensions of the article', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  dimensions: string | null;

  @ApiProperty({ example: 180, description: 'Weight in grams', nullable: true })
  @Column({ type: 'integer', nullable: true, name: 'weight_grams' })
  weight_grams: number | null;

  @ApiProperty({ example: '194397215915', description: 'Barcode of the article', nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  barcode: string | null;

  @ApiProperty({ example: 50, description: 'Current stock quantity' })
  @Column({ type: 'integer', default: 0, name: 'stock_quantity' })
  stock_quantity: number;

  @ApiProperty({ example: 5, description: 'Minimum stock level' })
  @Column({ type: 'integer', default: 5, name: 'min_stock_level' })
  min_stock_level: number;

  @ApiProperty({ example: 100, description: 'Maximum stock level' })
  @Column({ type: 'integer', default: 100, name: 'max_stock_level' })
  max_stock_level: number;

  @ApiProperty({ example: true, description: 'Whether the article is available for purchase' })
  @Column({ type: 'boolean', default: true, name: 'is_available' })
  is_available: boolean;

  @ApiProperty({ example: false, description: 'Whether the article is a preorder' })
  @Column({ type: 'boolean', default: false, name: 'is_preorder' })
  is_preorder: boolean;

  @ApiProperty({ example: '2024-12-25', description: 'Preorder release date', nullable: true })
  @Column({ type: 'date', nullable: true, name: 'preorder_release_date' })
  preorder_release_date: Date | null;

  @ApiProperty({ example: '2024-12-20', description: 'Preorder end date', nullable: true })
  @Column({ type: 'date', nullable: true, name: 'preorder_end_date' })
  preorder_end_date: Date | null;

  @ApiProperty({ 
    example: 'https://example.com/images/abbey-road.jpg', 
    description: 'URL of the article image',
    nullable: true
  })
  @Column({ type: 'varchar', length: 500, nullable: true, name: 'image_url' })
  image_url: string | null;

  @ApiProperty({ example: 0, description: 'Total number of units sold' })
  @Column({ type: 'integer', default: 0, name: 'total_sold' })
  total_sold: number;

  @ApiProperty({ example: 0.00, description: 'Average rating of the article' })
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.00, name: 'average_rating' })
  average_rating: number;

  @ApiProperty({ example: 0, description: 'Total number of ratings' })
  @Column({ type: 'integer', default: 0, name: 'total_ratings' })
  total_ratings: number;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'music_genre_id' })
  music_genre: Genre;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;
}