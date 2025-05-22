import { IsDateString, IsNumber } from 'class-validator';

export class ReserveDto {
  @IsNumber()
  campsiteId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  userId: number;
}