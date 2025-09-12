import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AnalogArticle } from './analog-article.entity';

@Entity({ name: 'vinyl' })
export class Vinyl {
  @ApiProperty({ example: 1, description: 'The unique identifier of the vinyl' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'The ID of the associated analog article' })
  @Column({ type: 'integer', name: 'analog_article_id', unique: true })
  analog_article_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the vinyl category' })
  @Column({ type: 'integer', name: 'vinyl_category_id' })
  vinyl_category_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the vinyl special edition', nullable: true })
  @Column({ type: 'integer', name: 'vinyl_special_edition_id', nullable: true })
  vinyl_special_edition_id: number | null;

  @ApiProperty({ example: 33, description: 'RPM of the vinyl' })
  @Column({ type: 'integer', default: 33 })
  rpm: number;

  @ApiProperty({ example: false, description: 'Whether the vinyl is a limited edition' })
  @Column({ type: 'boolean', default: false, name: 'is_limited_edition' })
  is_limited_edition: boolean;

  @ApiProperty({ example: 500, description: 'Remaining limited stock', nullable: true })
  @Column({ type: 'integer', nullable: true, name: 'remaining_limited_stock' })
  remaining_limited_stock: number | null;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  // Relations
  @OneToOne(() => AnalogArticle)
  @JoinColumn({ name: 'analog_article_id' })
  analog_article: AnalogArticle;
}