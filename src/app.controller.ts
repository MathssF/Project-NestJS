import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { Response } from 'express';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('start')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('github')
  @ApiExcludeEndpoint()
  redirectToGithub(@Res() res: Response) {
    return res.redirect('https://github.com/MathssF/Project-NestJS');
  }

  @IsPublic()
  @Get('help')
  informations() {
    return {
      msg: 'Bem vindo a nossa API, caso esteja usando no seu localhost, siga os seguintes passos:',
      seed: 'Procure pela rota /Seed , ela irá povoar o banco de dados. Certifique-se de usar ela somente uma vez',
      cache: 'Caso precise limpar o cache do Redis, use a rota /movie/clear',
      GitHub: 'Caso esteja querendo ver o repositório no github use o /github',
      url: 'Ou se preferir, siga o url direto: https://github.com/MathssF/Project-NestJS'
    }
  }
}
