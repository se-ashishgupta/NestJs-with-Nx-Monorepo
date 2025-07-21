import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

@Entity('auth')
export class Auth {
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt!: Date;
}
