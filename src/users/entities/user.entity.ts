import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserType } from './user-type.entity';
import { Gender } from './gender.entity';

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

  @Column()
  user_type_id: number;

  @Column({ nullable: true })
  gender_id: number | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_2fa_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  is_banned: boolean;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: 'user_type_id' })
  type: UserType;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
