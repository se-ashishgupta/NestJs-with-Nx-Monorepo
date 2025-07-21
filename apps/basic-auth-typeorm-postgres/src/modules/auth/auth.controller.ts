import { AuthService } from '@/modules/auth/auth.service';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  GetAllUsersResponse,
  GetUserByIdResponse,
  LoginResponse,
  RegisterResponse,
} from '@/modules/auth/auth.types';
import { JwtAuthGuard } from '@/modules/auth/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<RegisterResponse> {
    const user = await this.authService.register(body);

    return {
      success: true,
      message: 'Registered successfully',
      data: user,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    try {
      const { user, token } = await this.authService.login(body);

      return {
        success: true,
        message: 'Logged in successfully',
        data: {
          ...user,
        },
        token,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: error,
          }
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await this.authService.getAllUsers();

    return {
      success: true,
      data: users,
    };
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserByIdResponse> {
    const user = await this.authService.getUserById(id);

    return {
      success: true,
      data: user,
    };
  }
}
