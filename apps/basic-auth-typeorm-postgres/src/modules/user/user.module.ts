import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { Auth } from '@/modules/auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
