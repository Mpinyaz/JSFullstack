import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  Version,
  HttpStatus,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Version('1')
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Version('1')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.add(user);
  }

  @Patch(':id')
  @Version('1')
  async updateUser(
    @Param('id') id: string,
    @Body() user: CreateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
