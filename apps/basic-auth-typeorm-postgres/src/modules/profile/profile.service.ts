import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/auth/auth.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Profile } from '@/modules/profile/profile.entity';
import { CreateProfileDto } from '@/modules/profile/dto/createProfile.dto';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private authService: AuthService
  ) {}

  async createProfile(
    userId: string,
    profile: CreateProfileDto
  ): Promise<Profile> {
    const user = await this.authService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let userProfile = await this.profileRepository.findOneBy({ userId });

    if (userProfile) {
      throw new BadRequestException('Profile already exists');
    }

    userProfile = this.profileRepository.create({
      ...profile,
      userId,
    });

    return await this.profileRepository.save(userProfile);
  }

  getProfileById(id: string): Promise<Profile | null> {
    return this.profileRepository.findOneBy({ id });
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Profile>> {
    const queryBuilder = this.profileRepository.createQueryBuilder('profile');
    queryBuilder.where('profile.isDeleted = :isDeleted', { isDeleted: false });
    queryBuilder.andWhere('profile.isActive = :isActive', { isActive: true });
    queryBuilder.orderBy('profile.createdAt', 'DESC');

    return paginate<Profile>(queryBuilder, options);
  }
}
