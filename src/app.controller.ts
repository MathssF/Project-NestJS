import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db1')
  async testDbConnection1(): Promise<string> {
    return await this.appService.testConnection1();
  }

  @Get('test-db2')
  async testDbConnection2(): Promise<string> {
    return await this.appService.testConnection2();
  }
}
