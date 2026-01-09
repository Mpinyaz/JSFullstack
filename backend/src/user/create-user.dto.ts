import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  lastname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  dob?: string;
}
