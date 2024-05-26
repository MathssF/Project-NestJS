import { IsOptional, IsString, IsArray, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditMoviePost {
  @IsOptional()
  @IsString()
  @ApiProperty({ 
    description: `Aqui você pode opicionalmente mudar o nome`,
    required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ 
    description: `Aqui você pode opcionalmente mudar a descrição`,
    required: false })
  description?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: `Aqui você pode opcionalmente corrigir a data de lançamento`,
    required: false })
  release_date?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ 
    description: `Este Array é Adicional, serve para alterar completamente a lista de generos /n
    (Obs: Caso ele seja preenchido, os dois arrays de baixo não irão ser lidos mesmo se tiverem algo)`,
    required: false })
  listGenres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ 
    description: `Aqui serve para você adicionar alguns itens na lista de generos`,
    required: false })
  addGenres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ 
    description: `Aqui serve para você remover alguns itens da lista de generos`,
    required: false })
  delGenres?: number[];
}
