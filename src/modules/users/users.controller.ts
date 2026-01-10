import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
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
