import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_type' })
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => User, (user) => user.type)
  users: User[];
}
