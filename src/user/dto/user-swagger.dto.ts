import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Visitante',
    description: `O username será o nome principal para se logar`,
  })
  username: string;

  @ApiProperty({
    example: 'email@email.com',
    description: `O Email não terá utilidade direta nesta aplicação`,
  })
  email?: string;

  @ApiProperty({
    example: '123@abc',
    description: `A senha usa criptografia. Ela é indispensável para o login`,
  })
  password: string;
}
