const { Connection } = require('mongoose');

async function up(connection) {
  const collection = connection.collection('flights');

  // Create indexes for all required fields
  await collection.createIndex({ flightNumber: 1 }, { unique: true });
  await collection.createIndex({ origin: 1 });
  await collection.createIndex({ destination: 1 });
  await collection.createIndex({ departureTime: 1 });
  await collection.createIndex({ arrivalTime: 1 });
  await collection.createIndex({ price: 1 });
  await collection.createIndex({ airline: 1 });
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ isActive: 1 });
  await collection.createIndex({ isDeleted: 1 });

  // Compound index for origin and destination
  await collection.createIndex({ origin: 1, destination: 1 });

  console.log('Flights indexes created');
}

async function down(connection) {
  await connection.dropCollection('flights');
}

module.exports = { up, down };
