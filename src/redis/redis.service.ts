import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
// import { Redis, InjectRedis } from 'ioredis';

@Injectable()
export class RedisService {
  constructos(
    @InjectRedis() private readonly redis: Redis
  ) {
    // super();

    // super.on('error', (err) => {
    //   console.log('Error no Redis');
    //   console.log('Error: ', err);
    //   process.exit(1);
    // });

    // super.on('connect', () => {
    //   console.log('Redis connected!');
    // });
    
  }
}
