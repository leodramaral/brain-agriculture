import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Brain Agriculture API está funcionando! 🚀';
  }
}