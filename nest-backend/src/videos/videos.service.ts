import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) { }

  getFiles(res, image) {
    return res.sendFile(image, { root: './uploads' });
  }

  async uploadFile(file: any) {
    if (file) {
      console.log('File uploaded:', file.filename);

      const newVideo = await this.prismaService.video.create({
        data: {
          name: file.filename,
          status: false,
          checked: false
        },
      });

      console.log(newVideo)

      return { message: 'File uploaded successfully' };
    } else {
      throw new Error('No file uploaded');
    }
  }

  async findAllVideos() {
    const results = await this.prismaService.video.findMany({
    });

    console.log(results)
    return results
  }

  async deleteAllVideos() {
    const results = await this.prismaService.video.deleteMany({
    });

    console.log(results)
    return results
  }

  async changeStatus(videoData) {
    const id = videoData.id
    const video = await this.prismaService.video.update({
      where: { id },
      data: {
        status: videoData.status, // Set the new status here (true or false)
        checked: true
      },
    });
    return video;
  }

  async validatedVideos(){
    const videos = await this.prismaService.video.findMany({
      where: {
        checked: true,
        status: true
      }
    });

    return videos
  }

}