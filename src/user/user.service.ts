import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(
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
