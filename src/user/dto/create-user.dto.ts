import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty,
    // IsBoolean,
    // IsObject
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(25) 
  @ApiProperty({
    example: 'Visitante',
    description: `O username será o nome principal para se logar`,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  @ApiProperty({
    example: 'email@email.com',
    description: `O Email não terá utilidade direta nesta aplicação`,
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: '123@abc',
    description: `A senha usa criptografia. Ela é indispensável para o login`,
  })
  email: string;
}