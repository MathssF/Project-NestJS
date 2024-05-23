import { IsOptional, IsString, IsArray, IsNumber, IsDateString } from 'class-validator';

export class EditMoviePost {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  release_date?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  listGenres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  addGenres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  delGenres?: number[];
}
