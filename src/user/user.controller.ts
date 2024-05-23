import {
  Controller,
  Get,
  Param,
  NotFoundException,
  // Post,
  // Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly dataSource: DataSource,
  ) {}

  @Get('userid/:id')
  async getUserByID(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    const user = await this.userService.getUserByID(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('username/:username')
  async getUserByName(@Param('username') username: string): Promise<User> {
    const user = await this.userService.getUserByName(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @Post('register')
  // async register(@Body() registerDto: { username: string, email: string, password: string }) {
  //   return this.userService.createUser(registerDto.username, registerDto.email, registerDto.password);
  // }
  
  // // @Public()
  // @Post('login')
  // async login(@Body() loginDto: { username: string, password: string }) {
  //   console.log('Passando pelo controller ');
  //   return this.userService.login(loginDto.username, loginDto.password);
  // }
}
