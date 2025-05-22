import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateCampsiteDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  region: string; // ex) "경기도", "강원도"

  @IsBoolean()
  hasElectricity: boolean;

  @IsBoolean()
  hasWater: boolean;

  @IsBoolean()
  hasToilet: boolean;

  @IsArray()
  @IsOptional()
  amenities?: string[]; // ex) ["수영장", "화장대"]
}