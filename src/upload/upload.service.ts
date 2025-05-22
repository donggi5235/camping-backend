import { Injectable } from '@nestjs/common';
import { S3Service } from './s3.service';

@Injectable()
export class UploadService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    return this.s3Service.uploadFiles(files);
  }
}