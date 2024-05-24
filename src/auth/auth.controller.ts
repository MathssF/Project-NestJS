// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
//   Request,
//   UseGuards
// } from '@nestjs/common';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
// import { Public } from './constants';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Public()
//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() data: { username: string, password: string }) {
//     return this.authService.signIn(data.username, data.password);
//   }

//   @UseGuards(AuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
// }