import {
  IsNotEmpty,
  Length,
  MaxLength,
  maxLength,
  MinLength,
} from 'class-validator';
import { StatusEnum } from 'src/todo/entities/StatusEnum';
import { ErrorMessages } from 'src/common/error-messages';
export class AddTodo {
  @IsNotEmpty({ message: ErrorMessages.DESCRIPTION_REQUIRED })
  @MinLength(10, {
    message: ErrorMessages.NAME_MAX_LENGTH,
  })
  description: string;
  @IsNotEmpty({ message: ErrorMessages.NAME_REQUIRED })
  @MaxLength(10, { message: ErrorMessages.NAME_MAX_LENGTH })
  @MinLength(3, { message: ErrorMessages.NAME_MIN_LENGTH })
  name: string;
  createdAt: Date;
  status: StatusEnum;
}
