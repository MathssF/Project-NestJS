import { Module } from '@nestjs/common';
import {
    RedisModule as RedisModuleLib,
    RedisModuleOptions,
    RedisModuleAsyncOptions,
} from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';


@Module({
  imports: [
    RedisModuleLib.forRootAsync({
      imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        }) as unknown as RedisModuleOptions,
        inject: [ConfigService],
      }),
    ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
