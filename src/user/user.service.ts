import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<any> {

    const newData = {
      username: data.username,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    }

    const createdUser = await this.userRepository.save(newData);
    const result = {
      user: newData.username,
      email: newData.email,
      message: 'Welcome!',
    }

    return result;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    });
    if (!user) {
      return undefined;
    }
    return user;
  }

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
