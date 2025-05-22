import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campsite } from './campsite.entity';
import { CampsitesController } from './campsites.controller';
import { CampsitesService } from './campsites.service';
import { MapModule } from '../map/map.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campsite]), MapModule],
  controllers: [CampsitesController],
  providers: [CampsitesService],
  exports: [CampsitesService],
})
export class CampsitesModule {}