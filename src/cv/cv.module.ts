import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cv]), // Register Cv entity
    SkillModule, // Import SkillModule for shared usage
  ],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
