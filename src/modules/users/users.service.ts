import { Injectable } from '@nestjs/common';
import { UserRole } from './schemas/user.schema';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  createUser() {
    return this.usersRepo.create({
      firstName: 'Sama',
      lastName: 'Mansour',
      email: 'sama@travel.com',
      role: UserRole.ADMIN,
    });
  }

  getUsers() {
    return this.usersRepo.findAll();
  }

  deleteUser(id: string){
    return this.usersRepo.softDelete(id);
  }
}
