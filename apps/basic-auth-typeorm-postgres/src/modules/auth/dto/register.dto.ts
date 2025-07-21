import { UserRole } from '@/modules/auth/auth.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly userName!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  readonly role: UserRole = UserRole.USER;
}
