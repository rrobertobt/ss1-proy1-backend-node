import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'gender' })
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
