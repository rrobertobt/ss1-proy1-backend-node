import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'vinyl_category' })
export class VinylCategory {
  @ApiProperty({ example: 1, description: 'The unique identifier of the vinyl category' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '12"', description: 'Size of the vinyl category' })
  @Column({ type: 'varchar', length: 20, unique: true })
  size: string;

  @ApiProperty({ example: 'Standard 12-inch LP record', description: 'Description of the vinyl category', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ example: 33, description: 'Typical RPM for this vinyl category' })
  @Column({ type: 'integer', default: 33, name: 'typical_rpm' })
  typical_rpm: number;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}