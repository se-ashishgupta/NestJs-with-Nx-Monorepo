import { Profile } from '@/modules/profile/profile.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

interface BaseResponse {
  success: boolean;
}

export interface GetAllProfileResponse extends BaseResponse {
  data: Profile[];
}

export interface GetProfileByIdResponse extends BaseResponse {
  data: Profile | null;
}

export interface PaginateResponse extends BaseResponse {
  data: Pagination<Profile>;
}

export interface CreateProfileResponse extends BaseResponse {
  data: Profile;
}
