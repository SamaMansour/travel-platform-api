const fs = require('fs');
const path = require('path');

const name = process.argv[2];

if (!name) {
  console.log('❌ Please provide seed name');
  process.exit(1);
}

const timestamp = Date.now();
const fileName = `${timestamp}-${name}.seed.ts`;

const template = `
import { INestApplicationContext } from '@nestjs/common';

export async function run(app: INestApplicationContext) {
  console.log('Running ${name} seed');
}
`;

const filePath = path.join(
  __dirname,
  '../src/database/seeds',
  fileName,
);

fs.writeFileSync(filePath, template);

console.log('✅ Seed created:', fileName);
