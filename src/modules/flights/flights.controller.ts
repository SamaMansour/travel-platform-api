import { Controller, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightStatus } from './schemas/flight.schema';

@Controller('flights')
export class FlightsController {}

@Controller('admin/flights')
export class FlightsAdminController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  async searchFlights(@Query() query: any) {
    return this.flightsService.advancedSearch(query);
  }

  @Patch(':id/publish')
  async publish(@Param('id') id: string) {
    return this.flightsService.publishFlight(id);
  }

  @Patch(':id/unpublish')
  async unpublish(@Param('id') id: string) {
    return this.flightsService.unpublishFlight(id);
  }

  @Patch(':id/archive')
  async archive(@Param('id') id: string) {
    return this.flightsService.archiveFlight(id);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.flightsService.softDelete(id);
  }
}
