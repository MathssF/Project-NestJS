import { CreateMovieDto } from "./dto/create-movie.dto";
import { Movie } from "./entities/movies.entity";

export interface MovieR extends Movie {
  rating?: number;
}

export interface newMovie {
  userId: number;
  CreateMovieDto: CreateMovieDto;
}

export interface voteResult {
  msg: string;
  userId?: number;
  movieId?: number;
  username?: string;
  moviename?: string;
  vote: number;
  previousVote?: number;
}