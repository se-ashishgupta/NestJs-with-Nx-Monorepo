import {
  GetAllUserResponse,
  GetUserByIdResponse,
} from '@/modules/user/user.types';
import { UserService } from '@/modules/user/user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUser(): Promise<GetAllUserResponse> {
    const users = await this.userService.getAllUser();

    return {
      success: true,
      users,
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<GetUserByIdResponse> {
    const user = await this.userService.getUserById(id);

    return {
      success: true,
      user,
    };
  }
}
