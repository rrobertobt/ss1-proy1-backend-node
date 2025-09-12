import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Country } from '../../common/entities/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_address' })
export class UserAddress {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user address' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ApiProperty({ example: '123 Main Street', description: 'The first line of the address' })
  @Column()
  address_line_1: string;

  @ApiProperty({ example: 'Apt 4B', description: 'The second line of the address' })
  @Column({ nullable: true })
  address_line_2: string;

  @ApiProperty({ example: 'Guatemala City', description: 'The city of the address' })
  @Column()
  city: string;

  @ApiProperty({ example: 'Guatemala', description: 'The state or province of the address' })
  @Column({ nullable: true })
  state: string;

  @ApiProperty({ example: '01001', description: 'The postal code of the address' })
  @Column({ nullable: true })
  postal_code: string;

  @Column()
  country_id: number;

  @ApiProperty({ example: false, description: 'Whether this is the default address' })
  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @ApiProperty({ example: false, description: 'Whether this is the default billing address' })
  @Column({ type: 'boolean', default: false })
  is_billing_default: boolean;

  @ApiProperty({ example: false, description: 'Whether this is the default shipping address' })
  @Column({ type: 'boolean', default: false })
  is_shipping_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}