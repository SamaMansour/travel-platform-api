import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from '../../modules/flights/schemas/flight.schema';

export async function run(app: INestApplicationContext) {
  const flightModel = app.get<Model<FlightDocument>>(
    getModelToken(Flight.name),
  );

  await flightModel.deleteMany({});

  const airports = ['AMM', 'DXB', 'IST', 'LHR', 'JFK', 'CAI', 'DOH'];

  const flights: Flight[] = [];

  for (let i = 1; i <= 30; i++) {
    let origin = airports[Math.floor(Math.random() * airports.length)];
    let destination = airports[Math.floor(Math.random() * airports.length)];

    while (destination === origin) {
      destination = airports[Math.floor(Math.random() * airports.length)];
    }

    flights.push({
      flightNumber: `FL-${1000 + i}`,
      origin,
      destination,
      departureTime: new Date(),
      arrivalTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      price: Math.floor(Math.random() * 500) + 100,
      isActive: true,
    });
  }

  await flightModel.insertMany(flights);

  console.log('✅ Flights seeded');
}
