import {
  Controller, Get, Post, Body, Param,
  Delete, ParseIntPipe, Put, Request,
  NotFoundException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EditMoviePost } from './dto/update-movie.dto';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { Rating } from 'src/user/entities/rating.entity';
import { MovieR } from './movie.interface';
import { voteResult } from './movie.interface';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
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

  @Get('list')
  findAll(): Promise<Movie[]> {
    console.log('Entrou no Movies');
    return this.movieService.findAllMovies();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string): Promise<MovieR> {
    console.log('Entrou no Movie de algum id');
    return this.movieService.findMovieById(+id);
  }

  // Agora filtrar filmes por genero:

  @Get('by-genre/:id')
  async findMoviesByGenreId(@Param('id') id: number): Promise<Movie[]> {
    console.log('Entrou nos movies de algum genero');
    return this.movieService.findMoviesByGenreId(id);
  }

  @Get('by-genre-name/:name')
  async findMoviesByGenreName(@Param('name') name: string): Promise<Movie[]> {
    console.log('Entrou nos movies de algum genero pelo nome');
    return this.movieService.findMoviesByGenreName(name);
  }

  @Post('vote/:id')
  async voteMovie(
    @Param('id', ParseIntPipe) movieId: number,
    @Body('rating', ParseIntPipe) rating: number,
    @Request() request: any,
  ): Promise<voteResult> {
    const userId = request.user.id;
    const result = await this.movieService.vote(userId, movieId, rating);
    return result;
  }


  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Request() request: any,
  ): Promise<Movie> {

    console.log('Entrou no Create');
    const userId = request.user.id;
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
    const userId = request.user.id;
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
    const userId = request.user.id;
    const result = await this.movieService.delete(id, userId);
    if (!result.success) {
      throw new NotFoundException('Movie not found');
    }
    return result;
  }


  @Get('vote/:movieId')
  async getVotesByMovieId(@Param('movieId') movieId: number): Promise<Rating[]> {
    return this.movieService.getVotesByMovieId(movieId);
  }

  @Get('userVote/:userId')
  async getVotesByUserId(@Param('userId') userId: number): Promise<Rating[]> {
    return this.movieService.getVotesByUserId(userId);
  }
}
