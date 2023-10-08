import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
}
