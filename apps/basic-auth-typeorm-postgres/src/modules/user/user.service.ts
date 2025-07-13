import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '@/modules/auth/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>
  ) {}

  getAllUser(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  getUserById(id: string): Promise<Auth | null> {
    return this.authRepository.findOneBy({ id });
  }
}
