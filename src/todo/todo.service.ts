import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/todo/entities/StatusEnum';
import { TodoEntity } from 'src/todo/entities/todo.entity';
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

  // Méthode améliorée pour ajouter un todo avec un DTO
  async addTodo(createTodoDto: AddTodo, userId: number): Promise<TodoEntity> {
    if (!(createTodoDto.name.length > 2)) {
      throw new BadRequestException(`${ErrorMessages.NAME_MIN_LENGTH}`);
    }
    if (!(createTodoDto.name.length < 11)) {
      throw new BadRequestException(`${ErrorMessages.NAME_MAX_LENGTH}`);
    }

    if (!(createTodoDto.description.length > 10)) {
      throw new BadRequestException(`${ErrorMessages.DESCRIPTION_MIN_LENGTH}`);
    }

    const newTodo = this.todoRepository.create({ ...createTodoDto, userId });
    return await this.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, updateTodoDto: updateTodo): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (!todo) {
      return null;
    }
    if (!(updateTodoDto.name.length > 3 && updateTodoDto.name.length < 10)) {
      throw new BadRequestException('taille invalide');
    }

    if (updateTodoDto.description) {
      todo.description = updateTodoDto.description;
    }
    if (updateTodoDto.status) {
      todo.status = updateTodoDto.status;
    }

    return await this.todoRepository.save({ ...todo, ...updateTodoDto });
  }

  // async deleteTodo(id: number): Promise<TodoEntity> {
  //   const todo = await this.todoRepository.findOne({ where: { id: id } });
  //   if (!todo) {
  //     return null;
  //   }
  //   return await this.todoRepository.remove(todo);
  // }

  async deleteTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (!todo) {
      return null;
    }
    return await this.todoRepository.softRemove(todo);
  }

  async restoreTodo(id: number): Promise<UpdateResult> {
    return await this.todoRepository.restore(id);
  }

  async countTodosByStatus(): Promise<any> {
    const actifCount = await this.todoRepository.count({
      where: { status: StatusEnum.actif, deletedAt: null },
    });

    const waitingCount = await this.todoRepository.count({
      where: { status: StatusEnum.waiting, deletedAt: null },
    });

    const doneCount = await this.todoRepository.count({
      where: { status: StatusEnum.done, deletedAt: null },
    });

    return {
      actif: actifCount,
      waiting: waitingCount,
      done: doneCount,
    };
  }

  async getTodo(options: { page: number; limit: number }) {
    const { page, limit } = options;

    const [result, total] = await this.todoRepository.findAndCount({
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

  async getTodoByID(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException(`todo with id ${id} not found`);
    }
  }

  async getTodoPerso(test: string, status: StatusEnum): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find({
      where: [
        {
          status: status,
          name: Like(`%${test}%`),
        },
        {
          status: status,
          description: Like(`%${test}%`),
        },
      ],
    });

    return todos;
  }
}
