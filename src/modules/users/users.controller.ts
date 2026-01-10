import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';


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
  
  @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
      return req.user;
    }


}
