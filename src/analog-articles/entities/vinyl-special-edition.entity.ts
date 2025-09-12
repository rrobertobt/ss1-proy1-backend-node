import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'vinyl_special_edition' })
export class VinylSpecialEdition {
  @ApiProperty({ example: 1, description: 'The unique identifier of the vinyl special edition' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Picture Disc', description: 'Name of the special edition' })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({ example: 'Clear', description: 'Color of the vinyl', nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string | null;

  @ApiProperty({ example: 'Transparent vinyl with special artwork', description: 'Material description', nullable: true })
  @Column({ type: 'text', nullable: true, name: 'material_description' })
  material_description: string | null;

  @ApiProperty({ example: 'Includes bonus poster and stickers', description: 'Extra content included', nullable: true })
  @Column({ type: 'text', nullable: true, name: 'extra_content' })
  extra_content: string | null;

  @ApiProperty({ example: true, description: 'Whether this is a limited edition' })
  @Column({ type: 'boolean', default: true, name: 'is_limited' })
  is_limited: boolean;

  @ApiProperty({ example: 500, description: 'Limited quantity available', nullable: true })
  @Column({ type: 'integer', nullable: true, name: 'limited_quantity' })
  limited_quantity: number | null;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}