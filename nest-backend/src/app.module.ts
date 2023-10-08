import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidateModule } from './validate/validate.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, ValidateModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
