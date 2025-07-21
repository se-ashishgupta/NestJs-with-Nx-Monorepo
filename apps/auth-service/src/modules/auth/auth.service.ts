import { LoginDto } from '@/modules/auth/dto/login.dto';
import { Auth } from '@/modules/auth/auth.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '@/modules/auth/dto/register.dto';

// @Injectable({ scope: Scope.TRANSIENT }) // scope default is transient means new instance for each request
// @Injectable({ scope: Scope.REQUEST }) // scope default is request means new instance for each request
// @Injectable({ scope: Scope.DEFAULT }) // scope default is singleton
@Injectable() // scope default is singleton
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>
  ) {}

  async register(registerDto: RegisterDto): Promise<Auth> {
    // Option 1
    // return this.authRepository.save(registerDto);

    // Option 2
    // const user = this.authRepository.create(registerDto);
    // return this.authRepository.save(user);

    // Option 3
    const user = new Auth();

    user.email = registerDto.email;
    user.userName = registerDto.userName;
    user.password = registerDto.password;
    user.role = registerDto.role;

    return await this.authRepository.save(user);
  }

  login(loginDto: LoginDto) {
    // throw new Error('Not implemented yet');
    return {
      message: 'Login successful',
      data: {
        email: loginDto.email,
        password: loginDto.password,
      },
    };
  }

  getAllUser(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  getUserById(id: string): Promise<Auth | null> {
    return this.authRepository.findOneBy({ id });
  }
}
