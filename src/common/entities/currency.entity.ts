import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'currency' })
export class Currency {
  @ApiProperty({ example: 1, description: 'The unique identifier of the currency' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'GTQ', description: 'The currency code' })
  @Column({ type: 'char', length: 3, unique: true })
  code: string;

  @ApiProperty({ example: 'Guatemalan Quetzal', description: 'The currency name' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ example: 'Q', description: 'The currency symbol' })
  @Column({ type: 'varchar', length: 10, nullable: true })
  symbol: string | null;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}