import { LoginDto } from '@/modules/auth/dto/login.dto';
import { User } from '@/modules/auth/auth.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

// @Injectable({ scope: Scope.TRANSIENT }) // scope default is transient means new instance for each request
// @Injectable({ scope: Scope.REQUEST }) // scope default is request means new instance for each request
// @Injectable({ scope: Scope.DEFAULT }) // scope default is singleton
@Injectable() // scope default is singleton
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new BadRequestException(
        'Email already exists, please try a different email'
      );
    }

    user = await this.userRepository.findOne({
      where: { userName: registerDto.userName },
    });

    if (user) {
      throw new BadRequestException(
        'User Name already exists, please try a different user name'
      );
    }

    const salt = await bcrypt.genSalt();
    registerDto.password = await bcrypt.hash(registerDto.password, salt);

    const newUser = this.userRepository.create(registerDto);
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    let user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found, please register first');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password, please try again');
    }

    const payload = { userId: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      user,
      token,
    };
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        profile: true,
      },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { userName },
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        profile: true,
      },
      relations: ['profile'],
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        profile: true,
      },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        profile: true,
      },
      relations: ['profile'],
    });

    return users;
  }
}
