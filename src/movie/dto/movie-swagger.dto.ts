import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'A Viagem de Chihiro',
    description: `O nome do filme, usado para adicionar na lista, ou editar`,
  })
  name: string;

  @ApiProperty({
    example: 'Um Filme em estilo anime sobre uma menina emburrada que vive altas aventuras!',
    description: `A descrição serve para explicar sobre o filme`,
  })
  description?: string;

  @ApiProperty({
    example: '2 de Outubro de 2020',
    description: `Serve para marcar a data que o filme foi criado`,
  })
  realese_date: string;
}