import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FlightsModule } from '../modules/flights/flights.module';
import fs from 'fs';
import path from 'path';

async function bootstrap() {
  // Register FlightsModule for seeding
  const app = await NestFactory.createApplicationContext({
    module: AppModule,
    imports: [FlightsModule],
  });

  const seedsPath = path.join(__dirname, 'seeds');

  const files = fs
    .readdirSync(seedsPath)
    .filter((file) => file.endsWith('.ts'))
    .sort();

  for (const file of files) {
    console.log(`🌱 Running seed: ${file}`);
    const seed = await import(path.join(seedsPath, file));
    const runFn = seed.default?.run || seed.run;
    if (typeof runFn === 'function') {
      await runFn(app);
    } else {
      throw new Error(`Seed file ${file} does not export a run function.`);
    }
  }

  await app.close();
}

bootstrap();
