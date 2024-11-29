import { IsInt, IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsInt()
  age: number;

  @IsString()
  cin: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsArray()
  @IsInt({ each: true }) // Ensure each value is an integer (skill ID)
  skills: number[]; // Array of skill IDs
}
