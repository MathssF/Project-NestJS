import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/user/entities/user.repository';
import { User } from './user/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async testConnection(): Promise<string> {
    try {
      await this.userRepository.findOne({
        where: { id: 0 }
      });
      return 'Database connection is working!';
    } catch (error) {
      console.error('Database connection failed:', error);
      return 'Database connection failed!';
    }
  }
}
