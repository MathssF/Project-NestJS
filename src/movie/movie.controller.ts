import {
  Controller, Get, Post, Body, Param,
  Delete, UseGuards, ParseIntPipe, Put,
  NotFoundException, UnauthorizedException,
  Headers, Request,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EditMoviePost } from './dto/update-movie.dto';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface MovieR extends Movie {
  rating?: number;
}

interface newMovie {
  userId: number;
  CreateMovieDto: CreateMovieDto;
}

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    // private readonly authService: AuthService,
  ) {}

  @Get('genres')
  async findAllGenres(): Promise<Genre[]> {
    console.log('Entrou no Genres');
    return this.movieService.findGenres();
  }

  @Get('genres-names')
  async findAllGenreNames(): Promise<string[]> {
    console.log('Entrou no Genres Name');
    const genres = await this.movieService.findGenres();
    return genres.map(genre => genre.name);
  }

  @Get('movies')
  findAll(): Promise<Movie[]> {
    console.log('Entrou no Movies');
    return this.movieService.findAllMovies();
  }

  @Get('movie-by-id/:id')
  findOne(@Param('id') id: string): Promise<MovieR> {
    console.log('Entrou no Movie de algum id');
    return this.movieService.findMovieById(+id);
  }

  // Agora filtrar filmes por genero:

  @Get('movie-by-genre/:id')
  async findMoviesByGenreId(@Param('id') id: number): Promise<Movie[]> {
    console.log('Entrou nos movies de algum genero');
    return this.movieService.findMoviesByGenreId(id);
  }

  @Get('movie-by-genre-name/:name')
  async findMoviesByGenreName(@Param('name') name: string): Promise<Movie[]> {
    console.log('Entrou nos movies de algum genero pelo nome');
    return this.movieService.findMoviesByGenreName(name);
  }

  @Post('vote/:id')
  async voteMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @Body('rating', ParseIntPipe) rating: number,
    @Request() request: any,
  ): Promise<void> {
    console.log('Request user: ', request.user);
    console.log('Request user id: ', request.user.sub);
    const userId = request.user.sub;
    await this.movieService.vote(userId, movieId, rating);
  }


  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Request() request: any,
  ): Promise<Movie> {

    console.log('Entrou no Create');
    const userId = request.user.sub;
    return await this.movieService.create(
      createMovieDto,
      userId,
    );
  }

  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() movieData: EditMoviePost,
    @Request() request: any,
  ): Promise<Movie> {

    console.log('Entrou no Edit');
    const userId = request.user.sub;
    try {
      return await this.movieService.edit(
        id,
        movieData,
        userId,
      );
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
    @Request() request: any,
  ): Promise<{ success: boolean }> {
    console.log('Entrou no Delete');
    const userId = request.user.sub;
    const result = await this.movieService.delete(id, userId);
    if (!result.success) {
      throw new NotFoundException('Movie not found');
    }
    return result;
  }
}
