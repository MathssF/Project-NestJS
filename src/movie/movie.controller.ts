import {
  Controller, Get, Post, Body, Param,
  Delete, UseGuards, ParseIntPipe, Put,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EditMoviePost } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
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
@UseGuards(JwtAuthGuard)
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
  @Post('vote/:id')
  async voteMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @Body('token') token: string,
    @Body('rating', ParseIntPipe) rating: number,
  ): Promise<void> {
    const userId = await this.authService.getUserIdFromToken(token);
    if (userId === null) {
      throw new UnauthorizedException('Token inválido');
    }
    await this.movieService.vote(userId, movieId, rating);
  }

  @Post()
  async create(
    @Body('token') token: string,
    @Body() createMovieDto: CreateMovieDto,
    ): Promise<Movie> {
      const userId = await this.authService.getUserIdFromToken(token);
      if (userId === null) {
        throw new UnauthorizedException('Token inválido');
      }
    return await this.movieService.create(createMovieDto, userId);
  }

  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body('token') token: string,
    @Body() movieData: EditMoviePost
  ): Promise<Movie> {
    const userId = await this.authService.getUserIdFromToken(token);
      if (userId === null) {
        throw new UnauthorizedException('Token inválido');
      }
    try {
      return await this.movieService.edit(id, movieData, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }


  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Body('token') token: string,
  ): Promise<{ success: boolean }> {
    const userId = await this.authService.getUserIdFromToken(token);
      if (userId === null) {
        throw new UnauthorizedException('Token inválido');
      }
    const result = await this.movieService.delete(id, userId);
    if (!result.success) {
      throw new NotFoundException('Movie not found');
    }
    return result;
  }
}
