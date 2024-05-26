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
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}