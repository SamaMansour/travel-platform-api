import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  BOARDING = 'BOARDING',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
  LANDED = 'LANDED',
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
  PUBLISHED = "PUBLISHED",
}

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true, unique: true })
  flightNumber: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  departureTime: Date;

  @Prop({ required: true })
  arrivalTime: Date;

  @Prop({ required: true, enum: FlightStatus, default: FlightStatus.SCHEDULED })
  status: FlightStatus;

  @Prop({ required: true })
  economySeats: number;

  @Prop({ required: true })
  businessSeats: number;

  @Prop({ required: true })
  firstSeats: number;

  @Prop({ required: true })
  economyPrice: number;

  @Prop({ required: true })
  businessPrice: number;

  @Prop({ required: true })
  firstPrice: number;

  @Prop({ default: false })
  isDeleted: boolean;


   @Prop({ default: false })
  isActive: boolean;


  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  reason: string;

  @Prop({ required: false })
  airline: string[];

}

export const FlightSchema = SchemaFactory.createForClass(Flight);

FlightSchema.index({ flightNumber: 1 }, { unique: true });
FlightSchema.index({ origin: 1, destination: 1 });
FlightSchema.index({ departureTime: 1 });
FlightSchema.index({ status: 1 });