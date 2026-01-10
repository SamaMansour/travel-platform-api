import { Injectable } from '@nestjs/common';
import { UserRole } from './schemas/user.schema';
import { UsersRepository } from './user.repository';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository,
  @InjectConnection()
private readonly connection: Connection,

  ) {}

  createUser() {
    return this.usersRepo.create({
      firstName: 'Sama',
      lastName: 'Mansour',
      email: 'samatest@travel.com',
      role: UserRole.ADMIN,
    });
  }

  getUsers() {
    return this.usersRepo.findAll();
  }

  deleteUser(id: string){
    return this.usersRepo.softDelete(id);
  }
  async createUserWithLog(dto: CreateUserDto) {
  const session = await this.connection.startSession();

  try {
    session.startTransaction();

    const user = await this.usersRepo.create(dto, session);

    // Simulated audit log (we'll extract later)
    console.log('AUDIT_LOG', {
      action: 'USER_CREATED',
      userId: user._id,
    });

    await session.commitTransaction();
    return user;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}

}
