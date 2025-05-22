import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpModule, UsersModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}