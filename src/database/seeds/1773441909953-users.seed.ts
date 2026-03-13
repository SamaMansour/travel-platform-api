import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from '../../modules/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

export async function run(app: INestApplicationContext) {
  const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

  // Clear existing users (optional)
  await userModel.deleteMany({});

  // Hash passwords
  const password1 = await bcrypt.hash('Goout@4050', 10);
  const password2 = await bcrypt.hash('Password1', 10);

  // Seed users
  await userModel.insertMany([
    {
      firstName: 'Sama',
      lastName: 'Admin',
      email: 'sama@test.com',
      password: password1,
      role: UserRole.ADMIN,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Test',
      lastName: 'Customer',
      email: 'customer@example.com',
      password: password2,
      role: UserRole.CUSTOMER,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log('✅ Users seeded');
}