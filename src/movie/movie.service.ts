import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { MovieGenre } from './entities/movie-genre.entity';
import { Rating } from 'src/user/entities/rating.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EditMoviePost } from './dto/update-movie.dto';

interface MovieR extends Movie {
  rating?: number;
}


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  async findGenres(): Promise<Genre[]> {
    const listGenres = this.genreRepository.find();
    return listGenres;
  }

  async findGenresName(): Promise<string[]> {
    const genres = await this.genreRepository.find();
    const listNames = genres.map(genre => genre.name);
    return listNames;
  }
 
  async findAllMovies(): Promise<Movie[]> {
    const listMovies = this.movieRepository.find();
    return listMovies;
  }

  async findMovieById(id: number): Promise<any> {
    const movie = this.movieRepository.findOne({
        where: {
            id: id,
        }
    });
    if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
    const ratings = await this.ratingRepository.find({
      where: { movieId: id },
    });
    if (ratings.length === 0) {
      return movie;
    }
    const votesArray = ratings.map(rating => rating.rating); // Supondo que a coluna de valor de avaliação é 'value'
    const averageRating = votesArray.length
      ? (votesArray.reduce((a, b) => a + b, 0) / votesArray.length).toFixed(1)
      : null;
    const movieWithRating = { ...movie, rating: averageRating };
    return movieWithRating;
  }

  async findMoviesByGenreId(genreId: number): Promise<Movie[]> {
    const movieGenres = await this.movieGenreRepository.find({
        where: { genre: { id: genreId } }, relations: ['movie'],
    });
    const movieIds = movieGenres.map(movieGenre => movieGenre.movie.id);

    if (movieIds.length === 0) {
      return [];
    }
    const listMovies = this.movieRepository.findByIds(movieIds);
    return listMovies;
  }

  async findMoviesByGenreName(genreName: string): Promise<Movie[]> {
    const genre = await this.genreRepository.findOne({ where: { name: genreName } });
    if (!genre) {
        return [];
    }
    return this.findMoviesByGenreId(genre.id);
  }
  // async vote(userId: number, movieId: number, voteValue: number): Promise<void> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   if (!user.authority.vote) {
  //     throw new ForbiddenException('User does not have permission to vote');
  //   }
  //   if (!Number.isInteger(voteValue) || voteValue < 1 || voteValue > 5) {
  //       throw new ForbiddenException('You need chosse a value between 1 and 5')
  //   }
  //   const movie = await this.movieRepository.findOne({ where: { id: movieId } });
  //   if (!movie) {
  //     throw new NotFoundException(`Movie with ID ${movieId} not found`);
  //   }

  //   let rating = await this.ratingRepository.findOne({ where: { userId, movieId } });
  //   if (rating) {
  //     rating.rating = voteValue;
  //   } else {
  //     rating = this.ratingRepository.create({ userId, movieId, rating: voteValue });
  //   }
  //   await this.ratingRepository.save(rating);
  // }

  async create(
    movieData: CreateMovieDto,
    // userId: number,
  ): Promise<Movie> {
    if (movieData.id) {
      const existingMovie = await this.movieRepository.findOne({
        where: { id: movieData.id }
      });
      if (existingMovie) {
        throw new NotFoundException(`Movie with ID ${movieData.id} already exists`);
      }
    }

    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // if (!user.authority.add) {
    //   throw new ForbiddenException('User does not have permission to create new');
    // }
    const movie = this.movieRepository.create({
      name: movieData.name,
      description: movieData.description,
      release_date: movieData.release_date,
      ...(movieData.id && { id: movieData.id }), // Inclui o ID apenas se fornecido
    });
  
    const savedMovie = await this.movieRepository.save(movie);
  
    if (movieData.genres && movieData.genres.length > 0) {
      for (const genreId of movieData.genres) {
        const genre = await this.genreRepository.findOne({
          where: {
            id: genreId,
          }
        });
        if (!genre) {
          throw new NotFoundException(`Genre with ID ${genreId} not found`);
        }
        await this.movieGenreRepository.save({
          movie: savedMovie,
          genre: genre,
        });
      }
    }
  
    return savedMovie;
  }
  

  async edit(
    id: number,
    movieData: EditMoviePost,
    // userId: number
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // if (!user.authority.edit) {
    //   throw new ForbiddenException('User does not have permission to Edit');
    // }
  
    if (movieData.name) {
      movie.name = movieData.name;
    }
    if (movieData.description) {
      movie.description = movieData.description;
    }
    if (movieData.release_date) {
      movie.release_date = movieData.release_date;
    }
  
    await this.movieRepository.save(movie);
  
    if (movieData.listGenres) {
      await this.movieGenreRepository.delete({ movie: { id: movie.id } });
      for (const genreId of movieData.listGenres) {
        const genre = await this.genreRepository.findOne({ where: { id: genreId } });
        if (!genre) {
          throw new NotFoundException(`Genre with ID ${genreId} not found`);
        }
        await this.movieGenreRepository.save({ movie, genre });
      }
    } else {
      if (movieData.addGenres) {
        for (const genreId of movieData.addGenres) {
          const genre = await this.genreRepository.findOne({ where: { id: genreId } });
          if (!genre) {
            throw new NotFoundException(`Genre with ID ${genreId} not found`);
          }
          const existingRelation = await this.movieGenreRepository.findOne({ where: { movie: { id: movie.id }, genre: { id: genre.id } } });
          if (!existingRelation) {
            await this.movieGenreRepository.save({ movie, genre });
          }
        }
      }
  
      if (movieData.delGenres) {
        for (const genreId of movieData.delGenres) {
          const genre = await this.genreRepository.findOne({ where: { id: genreId } });
          if (!genre) {
            throw new NotFoundException(`Genre with ID ${genreId} not found`);
          }
          await this.movieGenreRepository.delete({ movie: { id: movie.id }, genre: { id: genre.id } });
        }
      }
    }
  
    return movie;
  }

  async delete(
    id: number,
    // userId: number,
  ): Promise<{ success: boolean }> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // if (!user.authority.del) {
    //   throw new ForbiddenException('User does not have permission to Delete');
    // }
    await this.movieRepository.remove(movie);
    return { success: true };
  }
}
