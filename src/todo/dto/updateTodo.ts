import {
  IsNotEmpty,
  Length,
  MaxLength,
  maxLength,
  MinLength,
} from 'class-validator';
import { StatusEnum } from 'src/todo/entities/StatusEnum';
import { ErrorMessages } from '../../common/error-messages';
export class updateTodo {
  @MinLength(10, {
    message: ErrorMessages.DESCRIPTION_MIN_LENGTH,
  })
  description: string;
  @MaxLength(10, { message: ErrorMessages.NAME_MAX_LENGTH })
  @MinLength(3, { message: ErrorMessages.NAME_MIN_LENGTH })
  name: string;
  createdAt: Date;
  status: StatusEnum;
}
