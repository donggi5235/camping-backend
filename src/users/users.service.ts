import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);
    const user = this.usersRepo.create({
      ...userData,
      password: hashedPassword,
    });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async validateUser(email: string, plainPassword: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(plainPassword, user.password))) {
      return user;
    }
    return null;
  }
}