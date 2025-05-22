import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from '../shared/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return res.status(201).json({
        message: '회원가입 성공',
        user: { id: user.id, email: user.email },
      });
    } catch (e) {
      return res.status(400).json({
        message: e.message || '회원가입 실패',
      });
    }
  }
}