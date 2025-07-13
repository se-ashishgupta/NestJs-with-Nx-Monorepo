import { Auth } from '@/modules/auth/auth.entity';

interface BaseResponse {
  success: boolean;
}

export interface GetAllUserResponse extends BaseResponse {
  users: Auth[];
}

export interface GetUserByIdResponse extends BaseResponse {
  user: Auth | null;
}
