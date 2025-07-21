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
import { Auth } from '@/modules/auth/auth.entity';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nestjs',
      entities: [Auth],
      synchronize: true,
    }),
    AuthModule,
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
