import { Controller, Get, Post, Patch, Param, Body, UseGuards, Query, Delete } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { FlightStatus } from './schemas/flight.schema';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
@Controller('flights')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}


}

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

  // @Patch(':id/archive')
  // async archive(@Param('id') id: string) {
  //   return this.flightsService.archiveFlight(id);
  // }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.flightsService.softDelete(id);
  }

    @Post()
  async createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.createFlight(createFlightDto);
  }

  @Patch(':id')
  async updateFlight(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.flightsService.updateFlight(id, updateFlightDto);
  }

  @Get(':id')
  async getFlightById(@Param('id') id: string) {
    return this.flightsService.getFlightById(id);
  }
}
