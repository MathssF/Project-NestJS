import { IsOptional, IsString, IsArray, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateMovieDto {
  @IsOptional()
  @ApiProperty({ required: false })
  id?: number;

  @IsString()
  @ApiProperty({
    example: 'A Viagem de Chihiro',
    description: `O nome do filme, usado para adicionar na lista, ou editar`,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Um Filme em estilo anime sobre uma menina emburrada que vive altas aventuras!',
    description: `A descrição serve para explicar sobre o filme`,
  })
  description: string;

  @IsDateString()
  @ApiProperty({
    example: '2 de Outubro de 2020',
    description: `Serve para marcar a data que o filme foi criado`,
  })
  release_date: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], required: false })
  genres?: number[];
}