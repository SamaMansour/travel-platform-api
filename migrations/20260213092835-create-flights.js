const { Connection } = require('mongoose');

async function up(connection) {
  const collection = connection.collection('flights');

  // Create indexes for all required fields
  await collection.createIndex({ flightNumber: 1 }, { unique: true });
  await collection.createIndex({ origin: 1 });
  await collection.createIndex({ destination: 1 });
  await collection.createIndex({ departureTime: 1 });
  await collection.createIndex({ arrivalTime: 1 });
  await collection.createIndex({ economySeats: 1 });
  await collection.createIndex({ businessSeats: 1 });
  await collection.createIndex({ firstSeats: 1 });
  await collection.createIndex({ economyPrice: 1 });
  await collection.createIndex({ businessPrice: 1 });
  await collection.createIndex({ firstPrice: 1 });
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ isDeleted: 1 });

  // Compound index for origin and destination
  await collection.createIndex({ origin: 1, destination: 1 });

  console.log('Flights indexes created');
}

async function down(connection) {
  await connection.dropCollection('flights');
}

module.exports = { up, down };
