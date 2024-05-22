import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis{
  constructos() {
    // super();

    super.on('error', (err) => {
      console.log('Error no Redis');
      console.log('Error: ', err);
      process.exit(1);
    });

    super.on('connect', () => {
      console.log('Redis connected!');
    });
  }
}
