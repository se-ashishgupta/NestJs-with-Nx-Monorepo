import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '@/modules/auth/auth.entity';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { ProfileModule } from '@/modules/profile/profile.module';
import { Profile } from '@/modules/profile/profile.entity';
import configuration from '@/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env'],
      load: [configuration],
      isGlobal: true,
      validate: validateEnv,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nestjs',
      entities: [User, Profile],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly dataSource: DataSource) {
    try {
      console.log(
        this.dataSource.driver.database,
        'dataSource connected successfully'
      );
    } catch (error) {
      console.error('Error during Data Source initialization', error);
    }
  }
  configure(consumer: MiddlewareConsumer) {
    // option 1
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    // option 2
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'auth/*',
    //   method: RequestMethod.ALL,
    // });
    // option 3
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
