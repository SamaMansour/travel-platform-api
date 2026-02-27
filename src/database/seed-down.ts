import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Map seed names to model tokens and messages
const seedMap: Record<string, { modelToken: string; collection: string }> = {
  flights: { modelToken: 'Flight', collection: 'flights' },
  users: { modelToken: 'User', collection: 'users' },
  // Add more seeds here as needed
};

async function bootstrap() {
  const seedName = process.argv[2];
  if (!seedName || !seedMap[seedName]) {
    console.error('❌ Please provide a valid seed name. Example: npm run seed:down flights');
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const model = app.get<Model<any>>(getModelToken(seedMap[seedName].modelToken));
  await model.deleteMany({});
  console.log(`✅ ${seedMap[seedName].collection} collection cleared`);
  await app.close();
}

bootstrap();