import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { randFullName, randJobTitle, randNumber } from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const cvService = app.get(CvService);

  console.log('Seeding database...');

  // Assume existing skills with IDs 1, 2, and 3
  const existingSkillIds = [1, 2, 3];

  // Function to get two unique random skill IDs
  const getRandomSkills = () => {
    const shuffled = [...existingSkillIds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); // Get the first two unique IDs
  };

  // Create CVs
  const userId = 1; // Assuming user ID 1 exists in the database
  const cvData = Array.from({ length: 10 }).map(() => ({
    name: randFullName().split(' ')[0], // First name
    firstname: randFullName().split(' ')[1], // Last name
    age: randNumber({ min: 20, max: 60 }),
    cin: randNumber({ min: 10000000, max: 99999999 }).toString(),
    job: randJobTitle(),
    path: '/path/to/resume.pdf',
    skills: getRandomSkills(), // Get two unique skill IDs
  }));

  for (const cv of cvData) {
    await cvService.create(cv, userId);
  }

  console.log('CVs seeded successfully!');

  await app.close();
}

bootstrap();
