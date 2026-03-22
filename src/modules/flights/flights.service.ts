import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Flight, FlightDocument, FlightStatus } from './schemas/flight.schema';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightsRepository } from './flights.repository';

@Injectable()
export class FlightsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(Flight.name)
    private readonly flightModel: Model<FlightDocument>,
    private readonly flightsRepository: FlightsRepository,
  ) {}

  async createFlight(data: Partial<Flight>) {
    return this.flightModel.create(data);
  }

  async getFlights() {
    return this.flightModel.find().lean();
  }

  async deleteFlight(id: string) {
    return this.flightModel.findByIdAndDelete(id);
  }

  async createFlightWithLog(data: Partial<Flight>) {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const flight = await this.flightModel.create([data], { session });
      // Simulated audit log
      console.log('AUDIT_LOG', {
        action: 'FLIGHT_CREATED',
        flightId: flight[0]._id,
      });
      await session.commitTransaction();
      return flight[0];
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }

  async advancedSearch(query: any) {
    const {
      origin,
      destination,
      minPrice,
      maxPrice,
      airline,
      status,
      isActive,
      startDate,
      endDate,
      page = 1,
      limit = 20,
      sortBy = 'departureTime',
      sortOrder = 'asc',
    } = query;

    const filter: any = { isDeleted: false };

    if (origin) filter.origin = origin;
    if (destination) filter.destination = destination;
    if (airline) filter.airline = airline;
    if (status) filter.status = status;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (startDate || endDate) filter.departureTime = {};
    if (startDate) filter.departureTime.$gte = new Date(startDate);
    if (endDate) filter.departureTime.$lte = new Date(endDate);

    const skip = (Number(page) - 1) * Number(limit);

    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const [results, total] = await Promise.all([
      this.flightModel.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
      this.flightModel.countDocuments(filter),
    ]);

    return {
      results,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  async updateStatus(id: string, status: FlightStatus) {
    return this.flightModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async publishFlight(id: string) {
    return this.updateStatus(id, FlightStatus.PUBLISHED);
  }

  async unpublishFlight(id: string) {
    return this.updateStatus(id, FlightStatus.DRAFT);
  }

  async archiveFlight(id: string) {
    return this.updateStatus(id, FlightStatus.ARCHIVED);
  }

  async softDelete(id: string) {
    return this.flightModel.findByIdAndUpdate(
      id,
      { isDeleted: true, status: FlightStatus.ARCHIVED },
      { new: true },
    );
  }

  async updateFlight(id: string, updateFlightDto: UpdateFlightDto): Promise<any> {
    const flight = await this.flightsRepository.findById(id);
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }
    return this.flightsRepository.update(id, updateFlightDto);
  }

async getFlightById(id: string): Promise<any> {
  const flight = await this.flightsRepository.findById(id);
  if (!flight) {
    throw new NotFoundException(`Flight with ID ${id} not found`);
  }
  return flight;
}
}
