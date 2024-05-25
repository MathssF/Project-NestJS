import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from 'src/models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    console.log('Entrou no auth/login');
    console.log('Req: ', req.user);
    return this.authService.login(req.user);
  }

//   @Public()
//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() data: { username: string, password: string }) {
//     return this.authService.signIn(data.username, data.password);
//   }

//   @UseGuards(AuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
}