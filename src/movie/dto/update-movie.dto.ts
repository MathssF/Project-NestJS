import { IsOptional, IsString, IsArray, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditMoviePost {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  release_date?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ required: false })
  listGenres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ required: false })
  addGenres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ required: false })
  delGenres?: number[];
}
