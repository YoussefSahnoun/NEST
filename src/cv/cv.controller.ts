import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { Request } from 'express';

@Controller('cvs')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
    // Assume user ID is passed from authentication middleware
    const userId = req['user'].userId;
    return this.cvService.create(createCvDto, userId);
  }

  @Get()
  async findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.cvService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCvDto: Partial<CreateCvDto>) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.cvService.remove(id);
  }
}
