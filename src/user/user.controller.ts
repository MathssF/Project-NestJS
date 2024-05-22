import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
