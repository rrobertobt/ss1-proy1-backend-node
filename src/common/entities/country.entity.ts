import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'country' })
export class Country {
  @ApiProperty({ example: 1, description: 'The unique identifier of the country' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Guatemala', description: 'The name of the country' })
  @Column()
  name: string;

  @ApiProperty({ example: 'GT', description: 'The two-letter country code' })
  @Column({ name: 'country_code' })
  country_code: string;

  @Exclude()
  @Column({ name: 'currency_id' })
  currency_id: number;
}