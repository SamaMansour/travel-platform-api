import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './schemas/flight.schema';
import { FlightsService } from './flights.service';
import { FlightsAdminController } from './flights.controller';
import { FlightsRepository } from './flights.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  providers: [FlightsService, FlightsRepository],
  controllers: [FlightsAdminController],
  exports: [MongooseModule, FlightsService, FlightsRepository],
})
export class FlightsModule {}
