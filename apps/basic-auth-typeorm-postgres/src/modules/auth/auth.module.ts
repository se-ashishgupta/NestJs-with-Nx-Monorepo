import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/auth/auth.entity';
import { ProfileModule } from '@/modules/profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from '@/modules/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
