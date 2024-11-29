import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from './entities/StatusEnum';
import { TodoEntity } from './entities/todo.entity';
import { Like, Repository, UpdateResult } from 'typeorm';
import { ErrorMessages } from 'src/common/error-messages';
import { AddTodo } from './dto/addTodo';
import { updateTodo } from './dto/updateTodo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async addTodo(createTodoDto: AddTodo, userId: number): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create({ ...createTodoDto, userId });
    return await this.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, updateTodoDto: updateTodo, userId: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
      throw new UnauthorizedException('Todo not found or you do not have access');
    }
    return await this.todoRepository.save({ ...todo, ...updateTodoDto });
  }

  async deleteTodo(id: number, userId: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
      throw new UnauthorizedException('Todo not found or you do not have access');
    }
    return await this.todoRepository.softRemove(todo);
  }

  async getTodoByUser(options: { page: number; limit: number }, userId: number) {
    const { page, limit } = options;

    const [result, total] = await this.todoRepository.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTodoByID(id: number, userId: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
      throw new UnauthorizedException('Todo not found or you do not have access');
    }
    return todo;
  }
}
