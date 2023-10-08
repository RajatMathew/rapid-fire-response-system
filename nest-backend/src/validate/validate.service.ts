import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateService {
    getHello(): string {
        return 'Hello World!';
      }
    
      roleHello(): string {
        return "hello from role";
      }

      validateVideo(): string {
        return ''
      }

      validateImages(): string {
        return ''
      }
}
