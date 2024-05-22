import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { UserService } from './user/user.service';
import { MovieService } from './movie/movie.service';

@Module({
  imports: [UserModule, MovieModule],
  controllers: [AppController],
  providers: [AppService, UserService, MovieService],
})
export class AppModule {}
