import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true })
  flightNumber: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  departureTime: Date;

  @Prop({ required: true })
  arrivalTime: Date;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);

FlightSchema.index({ flightNumber: 1 }, { unique: true });
FlightSchema.index({ origin: 1, destination: 1 });
FlightSchema.index({ departureTime: 1 });
FlightSchema.index({ arrivalTime: 1 });