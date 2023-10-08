import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<any> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        roles: ["user"],
        password: data.password,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
