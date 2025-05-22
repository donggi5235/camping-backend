import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campsite } from './campsite.entity';
import { CreateCampsiteDto } from 'src/shared/dtos/create-campsite.dto';
import { UploadService } from 'src/upload/upload.service';


@Injectable()
export class CampsitesService {
  constructor(
    @InjectRepository(Campsite)
    private campsiteRepo: Repository<Campsite>,
    private uploadService: UploadService,
  ) {}

  async findAll(): Promise<Campsite[]> {
    return this.campsiteRepo.find();
  }

  async findById(id: number): Promise<Campsite> {
    return this.campsiteRepo.findOne({ where: { id } });
  }

  async create(dto: CreateCampsiteDto, images: Express.Multer.File[]) {
    const imageUrls = await this.uploadService.uploadImages(images);
    return this.campsiteRepo.save({ ...dto, images: imageUrls });
  }
  async getTop5Popular() {
    return this.campsiteRepo.find({
      order: { reservations: 'DESC' },
      take: 5,
    });
  }
}