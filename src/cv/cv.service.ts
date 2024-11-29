import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>, // Inject Skill repository
  ) {}

  async create(createCvDto: CreateCvDto, userId: number): Promise<Cv> {
    const { skills: skillIds, ...cvData } = createCvDto;

    // Fetch skills by IDs from the database
    const skills = await this.skillRepository.findByIds(skillIds);

    if (skills.length !== skillIds.length) {
      throw new NotFoundException('One or more skills not found');
    }

    // Create the CV and associate it with the fetched skills
    const newCv = this.cvRepository.create({
      ...cvData,
      user: { id: userId }, // Associate with user
      skills, // Associate skills
    });

    return this.cvRepository.save(newCv);
  }

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find({ relations: ['user', 'skills'] });
  }

  async findOne(id: number): Promise<Cv> {
    return this.cvRepository.findOne({ where: { id }, relations: ['user', 'skills'] });
  }

  async update(id: number, updateCvDto: Partial<CreateCvDto>): Promise<Cv> {
    const { skills: skillIds, ...cvData } = updateCvDto;

    const skills = skillIds
      ? await this.skillRepository.findByIds(skillIds)
      : undefined;

    await this.cvRepository.update(id, {
      ...cvData,
      skills, // Only update skills if provided
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cvRepository.delete(id);
  }
}
