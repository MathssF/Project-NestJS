import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put, NotFoundException } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';

interface MovieR extends Movie {
  rating?: number; // Adicionando rating como opcional
}

@Controller('movie')
@UseGuards(JwtAuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

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
    @Body('userId', ParseIntPipe) userId: number,
    @Body('rating', ParseIntPipe) rating: number,
  ): Promise<void> {
    await this.movieService.vote(userId, movieId, rating);
  }

  // @Post()
  // async create(@Body() movieData: Partial<Movie>): Promise<Movie> {
  //   return await this.movieService.create(movieData);
  // }

  @Put(':id')
  async edit(@Param('id') id: number, @Body() movieData: Partial<Movie>): Promise<Movie> {
    return await this.movieService.edit(id, movieData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const result = await this.movieService.delete(id);
    if (!result.success) {
      throw new NotFoundException('Movie not found');
    }
    return result;
  }
}
