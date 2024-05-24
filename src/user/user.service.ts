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
    console.log('entrou no service do User, com o valor de id: ', id);
    const user = await this.userRepository.findOne({ where: {
      id: id }
    });
    console.log('Buscou o user: ', user);
    if (!user) {
      return undefined;
    }
    return user;
  }

  async getUserByName(username: string): Promise<User | undefined> {
    console.log('entrou no service do User, com o valor de name: ', username);
    const user = await this.userRepository.findOne({ where: { username } });
    console.log('Buscou o user: ', user);
    if (!user) {
      return undefined;
    }
    return user;
  }
}
