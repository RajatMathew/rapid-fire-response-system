import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/users/decorator/roles.decorator';
import { Role } from 'src/users/enum/role.enum';
import { RolesGuard } from 'src/users/guard/roles.guard';
import { ValidateService } from './validate.service';

@Controller('validate')
export class ValidateController {
    constructor(private readonly validateService: ValidateService) {}

    @Get('video')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.REPORTER)
    validateVideo() {
      return this.validateService.validateVideo();
    }


    @Get('images')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.REPORTER)
    validateImages() {
      return this.validateService.validateImages();
    }
}
