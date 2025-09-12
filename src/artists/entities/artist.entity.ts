import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../common/entities/country.entity';

@Entity({ name: 'artist' })
export class Artist {
  @ApiProperty({ example: 1, description: 'The unique identifier of the artist' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'The Beatles', description: 'The name of the artist or band' })
  @Column()
  name: string;

  @ApiProperty({ 
    example: 'English rock band formed in Liverpool in 1960', 
    description: 'Biography or description of the artist',
    nullable: true
  })
  @Column({ type: 'text', nullable: true })
  biography: string;

  @ApiProperty({ 
    example: '1960-08-01', 
    description: 'Date when the band was formed or artist was born',
    nullable: true
  })
  @Column({ type: 'date', nullable: true })
  formation_date: Date;

  @ApiProperty({ 
    example: '1960-08-01', 
    description: 'Date when the artist started their career',
    nullable: true
  })
  @Column({ type: 'date', nullable: true })
  career_start_date: Date;

  @ApiProperty({ example: 1, description: 'The ID of the country this artist is from' })
  @Column({ nullable: true })
  country_id: number;

  @ApiProperty({ example: true, description: 'Whether this artist is a band or solo artist' })
  @Column({ default: false })
  is_band: boolean;

  @ApiProperty({ 
    example: 'https://www.thebeatles.com', 
    description: 'Official website of the artist',
    nullable: true
  })
  @Column({ nullable: true })
  website: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}