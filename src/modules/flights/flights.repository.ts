import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './schemas/flight.schema';

@Injectable()
export class FlightsRepository {
  constructor(
    @InjectModel(Flight.name) private readonly flightModel: Model<FlightDocument>,
  ) {}

  async create(flight: Partial<Flight>): Promise<Flight> {
    return this.flightModel.create(flight);
  }

  async findAll(filter: any, options: any): Promise<{ results: Flight[]; total: number }> {
    const { page = 1, limit = 10, sortBy = 'departureTime', sortOrder = 'asc' } = options;
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [String(sortBy)]: sortOrder === 'asc' ? 1 : -1 };

    const [results, total] = await Promise.all([
      this.flightModel.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      this.flightModel.countDocuments(filter),
    ]);

    return { results, total };
  }

  async findById(id: string): Promise<Flight | null> {
    return this.flightModel.findById(id).lean();
  }

  async update(id: string, update: Partial<Flight>): Promise<Flight | null> {
    return this.flightModel.findByIdAndUpdate(id, update, { new: true }).lean();
  }

  async delete(id: string): Promise<Flight | null> {
    return this.flightModel.findByIdAndDelete(id).lean();
  }
}