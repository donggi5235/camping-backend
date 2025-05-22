import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationGateway } from './reservation.gateway';
import { CampsitesModule } from '../campsites/campsites.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    CampsitesModule,
    NotificationsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationGateway],
  exports: [ReservationsService],
})
export class ReservationsModule {}