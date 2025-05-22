import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { CreateCampsiteDto } from '../shared/dtos/create-campsite.dto';
import { UpdateCampsiteDto } from '../shared/dtos/update-campsite.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Campsites')
@ApiBearerAuth()
@Controller('campsites')
export class CampsitesController {
  constructor(private readonly campsitesService: CampsitesService) {}

  // 1. 캠핑장 생성 (관리자 전용)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FilesInterceptor('images', 5)) // 최대 5개 이미지 업로드
  @ApiOperation({ summary: '캠핑장 등록 (관리자)' })
  @ApiResponse({ status: 201, description: '캠핑장 생성 성공' })
  async create(
    @Body() createCampsiteDto: CreateCampsiteDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.campsitesService.create(createCampsiteDto, images);
  }

  // 2. 캠핑장 목록 조회 (필터링 가능)
  @Get()
  @ApiOperation({ summary: '캠핑장 목록 조회' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findAll(
    @Query('region') region?: string,
    @Query('hasElectricity') hasElectricity?: boolean,
    @Query('hasWater') hasWater?: boolean,
    @Query('hasToilet') hasToilet?: boolean,
  ) {
    return this.campsitesService.findAll({
      region,
      hasElectricity,
      hasWater,
      hasToilet,
    });
  }

  // 3. 캠핑장 상세 조회
  @Get(':id')
  @ApiOperation({ summary: '캠핑장 상세 정보' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 캠핑장' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campsitesService.findOne(id);
  }

  // 4. 캠핑장 정보 수정 (관리자 전용)
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FilesInterceptor('images', 5))
  @ApiOperation({ summary: '캠핑장 정보 수정 (관리자)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampsiteDto: UpdateCampsiteDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.campsitesService.update(id, updateCampsiteDto, images);
  }

  // 5. 캠핑장 삭제 (관리자 전용)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '캠핑장 삭제 (관리자)' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.campsitesService.remove(id);
  }

  // 6. 인기 캠핑장 TOP 5
  @Get('popular/top5')
  @ApiOperation({ summary: '인기 캠핑장 TOP 5' })
  async getTop5Popular() {
    return this.campsitesService.getTop5Popular();
  }
}