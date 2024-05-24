import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
