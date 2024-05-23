import { IsOptional, IsString, IsArray, IsNumber, IsDateString } from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  release_date: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  genres?: number[];
}