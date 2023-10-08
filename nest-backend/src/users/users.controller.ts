import { Controller, Post, Body, Get, Request, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      return { message: 'Email is already in use' };
    }
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }


}
