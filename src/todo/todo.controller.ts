import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodo } from './dto/addTodo';
import { updateTodo } from './dto/updateTodo';
import { todoPerso } from './dto/todoPerso';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async addTodo(@Body() createTodoDto: AddTodo, @Req() req: any) {
    const userId = req.user.userId; // Extract userId from middleware
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }
    return this.todoService.addTodo(createTodoDto, userId); // Pass userId to service
  }

  @Put('/:id')
  async updateTodo(@Param('id') id: number, @Body() updateTodoDto: updateTodo, @Req() req: any) {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }
    return this.todoService.updateTodo(id, updateTodoDto, userId); // Pass userId to service
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }
    return this.todoService.deleteTodo(id, userId); // Pass userId to service
  }

  @Get()
  async get(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Req() req: any) {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }
    return this.todoService.getTodoByUser({ page, limit }, userId); // Pass userId to service
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }
    return this.todoService.getTodoByID(id, userId); // Pass userId to service
  }
}
