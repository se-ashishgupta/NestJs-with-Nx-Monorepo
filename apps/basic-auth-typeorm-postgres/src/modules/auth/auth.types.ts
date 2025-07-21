import { Profile } from '@/modules/profile/profile.entity';
import { User } from '@/modules/auth/auth.entity';
interface CommonResponse {
  success: boolean;
  message?: string;
}

export interface RegisterResponse extends CommonResponse {
  data: User & { profile: Profile };
}

export interface LoginResponse extends CommonResponse {
  data: Omit<User, 'password'> & { profile: Profile };
  token: string;
}

export interface GetAllUsersResponse extends CommonResponse {
  data: (User & { profile: Profile })[];
}

export interface GetUserByIdResponse extends CommonResponse {
  data: (User & { profile: Profile }) | null;
}
