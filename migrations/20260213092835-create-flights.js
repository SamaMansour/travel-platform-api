const { Connection } = require('mongoose');

async function up(connection) {
  const collection = connection.collection('flights');

  await collection.createIndex({ flightNumber: 1 }, { unique: true });
  await collection.createIndex({ origin: 1, destination: 1 });
  await collection.createIndex({ departureTime: 1 });

  console.log('Flights indexes created');
}

async function down(connection) {
  await connection.dropCollection('flights');
}

module.exports = { up, down };
