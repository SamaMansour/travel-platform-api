import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './schemas/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Flight.name, schema: FlightSchema },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
  exports: [MongooseModule], // Export the model for use in other modules
})
export class FlightsModule {}
