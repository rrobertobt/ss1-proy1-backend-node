import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'gender' })
export class Gender {
  @ApiProperty({ example: 1, description: 'The unique identifier of the gender' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Masculino', description: 'The name of the gender' })
  @Column()
  name: string;
}
