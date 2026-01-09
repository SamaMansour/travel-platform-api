import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.createUser();
  }

  @Get()
  findAll() {
    return this.usersService.getUsers();
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
  return this.usersService.deleteUser(id);
  }

}
