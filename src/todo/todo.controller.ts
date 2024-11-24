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
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodo } from './dto/addTodo';
import { updateTodo } from './dto/updateTodo';
import { todoPerso } from './dto/todoPerso';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async addTodo(@Body() createTodoDto: AddTodo, @Req() req: Request) {
    return this.todoService.addTodo(createTodoDto, 1);
  }

  @Put('/:id')
  async updateTodo(@Param('id') id: number, @Body() updateTodoDto: updateTodo) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Put('/restore/:id')
  async restoreTodo(@Param('id') id: number) {
    return this.todoService.restoreTodo(id);
  }
  @Get('/count')
  async count() {
    return this.todoService.countTodosByStatus();
  }
  @Get()
  async get(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.todoService.getTodo({ page, limit });
  }
  @Get('/getPerso')
  async getPerso(@Body() todoPerso: todoPerso) {
    return this.todoService.getTodoPerso(todoPerso.test, todoPerso.status);
  }
  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.todoService.getTodoByID(id);
  }

}
