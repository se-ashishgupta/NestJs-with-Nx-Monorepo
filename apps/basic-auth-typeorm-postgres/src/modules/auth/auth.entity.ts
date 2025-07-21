import { Profile } from '@/modules/profile/profile.entity';
import {
  Column,
  Entity,
  DeleteDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Unique(['userName'])
  @Column({ type: 'varchar', length: 255 })
  userName!: string;

  @Unique(['email'])
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean = false;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Profile;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt!: Date;
}
