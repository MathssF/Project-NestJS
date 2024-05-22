import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserByID(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: {
      id: id }
    });
    if (!user) {
      return undefined;
    }
    return user;
  }

  async getUserByName(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return undefined;
    }
    return user;
  }
}
