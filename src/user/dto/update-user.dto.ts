import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
