import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cassette_category' })
export class CassetteCategory {
  @ApiProperty({ example: 1, description: 'The unique identifier of the cassette category' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'New', description: 'Name of the cassette category' })
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @ApiProperty({ example: 0.00, description: 'Discount percentage for this category' })
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, name: 'discount_percentage' })
  discount_percentage: number;

  @ApiProperty({ example: 'Brand new, sealed cassette', description: 'Description of the category', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}