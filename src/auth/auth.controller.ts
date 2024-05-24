import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login() {
    return 'Realizar Login';
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