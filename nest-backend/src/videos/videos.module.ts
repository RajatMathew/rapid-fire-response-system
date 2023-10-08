import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VideosService, PrismaService],
  controllers: [VideosController]
})
export class VideosModule {}
