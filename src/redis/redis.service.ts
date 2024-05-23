import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable } from '@nestjs/common';
// import { RedisModule } from './redis.module';
import Redis from 'ioredis';
// import { Redis, InjectRedis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @InjectRedis('RedisToken') private readonly redis: Redis, // Injete o token 'RedisToken'
  ) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl);
    } else {
      await this.redis.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
