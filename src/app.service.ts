import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UserRepository } from 'src/user/entities/user.repository';
import { User } from './user/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async testConnection1(): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: 1 }
      });
      if (user) {
        return `User name:`// ${user.name}`; // Retorna o nome do usuário
      } else {
        return 'User not found';
      }
  
    } catch (error) {
      console.error('Database connection failed:', error);
      return 'Database connection failed!';
    }
  }

  async testConnection2(): Promise<string> {
    try {
      const users = await this.userRepository.find();
      const userCount = users.length;
      return `${userCount} users`;
    } catch (error) {
      console.error('Database connection failed:', error);
      return 'Database connection failed!';
    }
  }
}
