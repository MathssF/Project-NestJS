import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna as configurações globais
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'MKSdatabase',
      username: 'postgres',
      password: '123456',

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
