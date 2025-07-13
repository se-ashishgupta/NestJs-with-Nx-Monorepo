import { AppService } from '@/app.service';
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { success: boolean; message: string } {
    return this.appService.getHello();
  }
}
