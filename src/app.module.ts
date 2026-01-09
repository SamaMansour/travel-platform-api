import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/travel-platform'),
    UsersModule,
  ],
})
export class AppModule {}
