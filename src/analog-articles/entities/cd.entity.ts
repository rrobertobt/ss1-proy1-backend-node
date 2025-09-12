import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AnalogArticle } from './analog-article.entity';

@Entity({ name: 'cd' })
export class Cd {
  @ApiProperty({ example: 1, description: 'The unique identifier of the CD' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'The ID of the associated analog article' })
  @Column({ name: 'analog_article_id', unique: true })
  analog_article_id: number;

  @ApiProperty({ example: 2, description: 'Number of discs in the CD' })
  @Column({ type: 'integer', default: 1, name: 'disc_count' })
  disc_count: number;

  @ApiProperty({ example: true, description: 'Whether the CD has bonus content' })
  @Column({ type: 'boolean', default: false, name: 'has_bonus_content' })
  has_bonus_content: boolean;

  @ApiProperty({ example: false, description: 'Whether the CD is remastered' })
  @Column({ type: 'boolean', default: false, name: 'is_remastered' })
  is_remastered: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  // Relations
  @OneToOne(() => AnalogArticle)
  @JoinColumn({ name: 'analog_article_id' })
  analog_article: AnalogArticle;
}