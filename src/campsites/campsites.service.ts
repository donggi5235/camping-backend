import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campsite } from './campsite.entity';

@Injectable()
export class CampsitesService {
  constructor(
    @InjectRepository(Campsite)
    private campsiteRepo: Repository<Campsite>,
  ) {}

  async findAll(): Promise<Campsite[]> {
    return this.campsiteRepo.find();
  }

  async findById(id: number): Promise<Campsite> {
    return this.campsiteRepo.findOne({ where: { id } });
  }
}