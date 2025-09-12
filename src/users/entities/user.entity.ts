import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './user-type.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password_hash: string;

  @Column({ name: 'user_type_id' })
  userTypeId: number;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: 'user_type_id' })
  type: UserType;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;
}
