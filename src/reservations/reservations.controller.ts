import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReserveDto } from '../shared/dtos/reserve.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() reserveDto: ReserveDto) {
    return this.reservationsService.create(reserveDto);
  }
}