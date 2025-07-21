import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '@/modules/auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [
    // AuthService,
    {
      provide: AuthService,
      useClass: AuthService,
    },
    // {
    //   provide: AuthService,
    //   useValue: mockAuthService,
    // },
    // {
    //   provide: 'CONNECTION',
    //   useValue: connection,
    // },
  ],
})
export class AuthModule {}
