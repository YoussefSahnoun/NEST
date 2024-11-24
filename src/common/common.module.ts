import { Module } from '@nestjs/common';
import { UuidService } from '../common/uuid/uuid.service';

@Module({
  providers: [UuidService],
  exports: [UuidService],
})
export class CommonModule {}
