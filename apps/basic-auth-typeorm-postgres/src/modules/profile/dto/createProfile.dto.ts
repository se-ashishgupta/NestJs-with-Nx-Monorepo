import { User } from '@/modules/auth/auth.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  mobile!: string;
}
