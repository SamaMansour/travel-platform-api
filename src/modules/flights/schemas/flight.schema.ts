import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

export enum FlightStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

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

  @Prop({ required: true })
  airline: string;

  @Prop({ enum: FlightStatus, default: FlightStatus.DRAFT })
  status: FlightStatus;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false, select: false })
  isDeleted: boolean;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);

FlightSchema.index({ flightNumber: 1 }, { unique: true });
FlightSchema.index({ origin: 1, destination: 1 });
FlightSchema.index({ departureTime: 1 });
FlightSchema.index({ arrivalTime: 1 });
FlightSchema.index({ price: 1 });
FlightSchema.index({ airline: 1 });
FlightSchema.index({ status: 1 });
FlightSchema.index({ isActive: 1 });
FlightSchema.index({ isDeleted: 1 });