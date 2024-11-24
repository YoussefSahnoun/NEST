import { Controller, Get } from '@nestjs/common';
import { UuidService } from './common/uuid/uuid.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly uuidService: UuidService) {}

  @Get('uuid')
  getUUID(): string {
    return this.uuidService.generateUUID();
  }
}
