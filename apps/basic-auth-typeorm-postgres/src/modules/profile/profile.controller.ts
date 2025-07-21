import {
  CreateProfileResponse,
  GetProfileByIdResponse,
  PaginateResponse,
} from '@/modules/profile/profile.types';
import { ProfileService } from '@/modules/profile/profile.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProfileDto } from '@/modules/profile/dto/createProfile.dto';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly authService: AuthService
  ) {}

  @Post(':userId')
  async createProfile(
    @Body() body: CreateProfileDto,
    @Param('userId') userId: string
  ): Promise<CreateProfileResponse> {
    const user = await this.authService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.profileService.createProfile(userId, body);

    return {
      success: true,
      data: profile,
    };
  }

  @Get('paginate')
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ): Promise<PaginateResponse> {
    limit = limit > 100 ? 100 : limit;

    const profiles = await this.profileService.paginate({
      page,
      limit,
    });

    return {
      success: true,
      data: profiles,
    };
  }

  @Get(':id')
  async getProfileById(
    @Param('id') id: string
  ): Promise<GetProfileByIdResponse> {
    const profile = await this.profileService.getProfileById(id);

    return {
      success: true,
      data: profile,
    };
  }
}
