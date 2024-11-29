import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]), // Register Skill entity
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [TypeOrmModule], // Export to make it available to other modules
})
export class SkillModule {}
