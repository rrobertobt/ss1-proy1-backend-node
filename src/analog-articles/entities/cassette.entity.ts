import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AnalogArticle } from './analog-article.entity';

@Entity({ name: 'cassette' })
export class Cassette {
  @ApiProperty({ example: 1, description: 'The unique identifier of the cassette' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'The ID of the associated analog article' })
  @Column({ type: 'integer', name: 'analog_article_id', unique: true })
  analog_article_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the cassette category' })
  @Column({ type: 'integer', name: 'cassette_category_id' })
  cassette_category_id: number;

  @ApiProperty({ example: 'TDK', description: 'Brand of the cassette', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  brand: string | null;

  @ApiProperty({ example: false, description: 'Whether the cassette is chrome tape' })
  @Column({ type: 'boolean', default: false, name: 'is_chrome_tape' })
  is_chrome_tape: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  // Relations
  @OneToOne(() => AnalogArticle)
  @JoinColumn({ name: 'analog_article_id' })
  analog_article: AnalogArticle;
}