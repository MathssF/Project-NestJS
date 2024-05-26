import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}
  @Get()
  @ApiExcludeEndpoint()
  async seed(): Promise<string> {
    try {
      await this.seedService.seed();
      return 'Seed data has been successfully inserted!';
    } catch(error) {
      console.log('Erro esta aqui: ', error);
    }
  }

}
