import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log("request.user", user);
    const payload = {
      name: user.name,
      sub: user.id,
      roles: user.roles
    }

    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'SECRET'
      })
    }
  }
}
