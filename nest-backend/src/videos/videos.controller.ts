import { Controller, Get, Put, Body, Param, Res, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VideosService } from './videos.service';
import { FileUploadInterceptor } from './interceptor/file.interceptor';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';


@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('fetch/:filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filepath = path.join(__dirname, '..', '..', '..', 'uploads', filename);
    console.log(filepath);
    const filestream = fs.createReadStream(filepath);
    filestream.pipe(res);
  }

  @Post('upload')
  @UseInterceptors(FileUploadInterceptor)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.videosService.uploadFile(file);
  }

  @Post(':img') 
  seeUploadedFile(@Param('img') image, @Res() res) { 
    return this.videosService.getFiles(res, image);
  }

  @Get('all')
  async getAllVideoRecord() {
    return this.videosService.findAllVideos();
  }

  @Get('deleteall')
  async getDeleteAll() {
    return this.videosService.deleteAllVideos();
  }

  @Put('status')
  async changeStatus(@Body() body) {
    return this.videosService.changeStatus(body);
  }

  @Post('valid')
  async validatedVideo() {
    return this.videosService.validatedVideos();
  }
  
};
