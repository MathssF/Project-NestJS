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
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
// import { Public } from 'src/common/decorators/public.decorator'; // Importe o decorator Public

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.login(signInDto.username, signInDto.password);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Post('register')
  async register(@Body() registerDto: { username: string, email: string, password: string }) {
    return this.authService.createUser(registerDto.username, registerDto.email, registerDto.password);
  }
  
  // @Public()
  @Post('login')
  async login(@Body() loginDto: { username: string, password: string }) {
    console.log('Passando pelo controller ');
    return this.authService.login(loginDto.username, loginDto.password);
  }


}
