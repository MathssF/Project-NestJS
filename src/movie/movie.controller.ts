import {
  Controller, Get, Post, Body, Param,
  Delete, UseGuards, ParseIntPipe, Put,
  NotFoundException, UnauthorizedException,
  Headers, Request,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EditMoviePost } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { AuthService } from 'src/auth/auth.service';

interface MovieR extends Movie {
  rating?: number;
}

interface newMovie {
  userId: number;
  CreateMovieDto: CreateMovieDto;
}

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
  ) {}

  @Get('genres')
  async findAllGenres(): Promise<Genre[]> {
    return this.movieService.findGenres();
  }

  @Get('genres-names')
  async findAllGenreNames(): Promise<string[]> {
    const genres = await this.movieService.findGenres();
    return genres.map(genre => genre.name);
  }

  @Get('movies')
  findAll(): Promise<Movie[]> {
    return this.movieService.findAllMovies();
  }

  @Get('movie-by-id/:id')
  findOne(@Param('id') id: string): Promise<MovieR> {
    return this.movieService.findMovieById(+id);
  }

  // Agora filtrar filmes por genero:

  @Get('movie-by-genre/:id')
  async findMoviesByGenreId(@Param('id') id: number): Promise<Movie[]> {
    return this.movieService.findMoviesByGenreId(id);
  }

  @Get('movie-by-genre-name/:name')
  async findMoviesByGenreName(@Param('name') name: string): Promise<Movie[]> {
    return this.movieService.findMoviesByGenreName(name);
  }

  // Votar, Adicionar, Editar e Deletar:
  // @Post('vote/:id')
  // async voteMovie(
  //   @Param('id', ParseIntPipe) movieId: number,
  //   @Headers('authorization') authorization: string,
  //   @Body('userId') userId: number,
  //   @Body('rating', ParseIntPipe) rating: number,
  // ): Promise<void> {
  //   // const userId = await this.authService.getUserIdFromToken(authorization);
  //   // if (userId === null) {
  //   //   throw new UnauthorizedException('Token inválido');
  //   // }
  //   await this.movieService.vote(userId, movieId, rating);
  //   // await this.movieService.vote(userId, movieId, rating);
  // }
  @Post('vote/:id')
  async voteMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @Headers('authorization') authorization: string,
    @Body('rating', ParseIntPipe) rating: number,
    @Request() request // Adicione a injeção de dependência para acessar o userId
  ): Promise<void> {
    const userId = request.user.sub; // Obtenha o userId do objeto de solicitação
    await this.movieService.vote(userId, movieId, rating);
  }

  // @Post()
  // async create(
  //   @Headers('authorization') authorization: string,
  //   @Body() createMovieDto: CreateMovieDto,
  //   @Body('userId') userId: number,
  //   ): Promise<Movie> {
  //     // const userId = await this.authService.getUserIdFromToken(authorization);
  //     // if (userId === null) {
  //     //   throw new UnauthorizedException('Token inválido');
  //     // }
  //   return await this.movieService.create(createMovieDto, userId);
  // }
  @Post()
  async create(
    @Headers('authorization') authorization: string,
    @Body() createMovieDto: CreateMovieDto,
    @Request() request // Adicione a injeção de dependência para acessar o userId
  ): Promise<Movie> {
    const userId = request.user.sub; // Obtenha o userId do objeto de solicitação
    return await this.movieService.create(createMovieDto, userId);
  }

  // @Put(':id')
  // async updateMovie(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Headers('authorization') authorization: string,
  //   @Body() movieData: EditMoviePost,
  //   @Body('userId') userId: number,
  // ): Promise<Movie> {
  //   // const userId = await this.authService.getUserIdFromToken(authorization);
  //   //   if (userId === null) {
  //   //     throw new UnauthorizedException('Token inválido');
  //   //   }
  //   try {
  //     return await this.movieService.edit(id, movieData, userId);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     throw error;
  //   }
  // }
  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization: string,
    @Body() movieData: EditMoviePost,
    @Request() request // Adicione a injeção de dependência para acessar o userId
  ): Promise<Movie> {
    const userId = request.user.sub; // Obtenha o userId do objeto de solicitação
    try {
      return await this.movieService.edit(id, movieData, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  // @Delete(':id')
  // async delete(
  //   @Param('id') id: number,
  //   @Headers('authorization') authorization: string,
  //   @Body('userId') userId: number,
  // ): Promise<{ success: boolean }> {
  //   // const userId = await this.authService.getUserIdFromToken(authorization);
  //   //   if (userId === null) {
  //   //     throw new UnauthorizedException('Token inválido');
  //   //   }
  //   const result = await this.movieService.delete(id, userId);
  //   if (!result.success) {
  //     throw new NotFoundException('Movie not found');
  //   }
  //   return result;
  // }
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Headers('authorization') authorization: string,
    @Request() request // Adicione a injeção de dependência para acessar o userId
  ): Promise<{ success: boolean }> {
    const userId = request.user.sub; // Obtenha o userId do objeto de solicitação
    const result = await this.movieService.delete(id, userId);
    if (!result.success) {
      throw new NotFoundException('Movie not found');
    }
    return result;
  }
}
