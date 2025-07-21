import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from '@/modules/profile/profile.controller';
import { ProfileService } from '@/modules/profile/profile.service';
import { User } from '@/modules/auth/auth.entity';
import { Profile } from '@/modules/profile/profile.entity';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
