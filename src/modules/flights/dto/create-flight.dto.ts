import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { FlightStatus } from '../schemas/flight.schema';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDateString()
  departureTime: Date;

  @IsDateString()
  arrivalTime: Date;

  @IsEnum(FlightStatus)
  status: FlightStatus;

  @IsInt()
  @Min(1)
  economySeats: number;

  @IsInt()
  @Min(1)
  businessSeats: number;

  @IsInt()
  @Min(1)
  firstSeats: number;

  @IsNumber()
  @Min(0)
  economyPrice: number;

  @IsNumber()
  @Min(0)
  businessPrice: number;

  @IsNumber()
  @Min(0)
  firstPrice: number;

}