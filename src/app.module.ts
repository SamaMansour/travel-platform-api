import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/travel-platform', {
      retryWrites: true,
      w: 'majority',
    }),
  ],
})
export class AppModule {}
