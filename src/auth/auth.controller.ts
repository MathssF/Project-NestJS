import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: { username: string, email: string, password: string }) {
    return this.authService.createUser(registerDto.username, registerDto.email, registerDto.password);
  }
  
  @Post('login')
  async login(@Body() loginDto: { username: string, password: string }) {
    return this.authService.login(loginDto.username, loginDto.password);
  }


}
