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
import { Public } from 'src/auth/constants';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly dataSource: DataSource,
  ) {}

  // @Public()
  @Get('create')
  async createNewUser(
    @Param('username') username: string,
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<any> {
    const data = {
      username: username,
      password: password,
      email: email,
    }
    return this.userService.create(data);
  }

  // @Public()
  @Get('userid/:id')
  async getUserByID(@Param('id') id: string): Promise<User> {
    console.log('Entrou na rota de user id');
    const userId = parseInt(id, 10);
    const user = await this.userService.getUserByID(userId);
    console.log('Testando se encontrou um user: ... ', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @Public()
  @Get('username/:username')
  async getUserByName(@Param('username') username: string): Promise<User> {
    console.log('Entrou na rota de username');
    const user = await this.userService.getUserByName(username);
    console.log('Testando se encontrou um user: ... ', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
