import type { LoginInputs } from '../../../features/authentication/validations/login';
import type { SignUpInputs } from '../../../features/authentication/validations/sign-up';
import type { SerializedError } from '@reduxjs/toolkit';

export type RegisterPayload = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo?: string;
  isBlocked?: boolean;
  isAdmin?: boolean;
};

export type UserDetails = {
  user: User & {
    active: boolean;
    followers: [string];
    following: [string];
    createdAt: string;
    postCount: number;
    bio: string;
    website: string;
    address: string;
    education: string;
    work: string;
  };
};

export type RegisterFields = Exclude<keyof SignUpInputs, 'confirmPassword'>;
export type LoginFields = keyof LoginInputs;

type ApiError = {
  success?: boolean;
  errors?: {
    fieldName: RegisterFields | LoginFields;
    message: string;
  }[];
} & SerializedError;

export type UserState = {
  loading: boolean;
  data: User | null;
  error: ApiError | null;
};

export type DashboardInfo = {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalFollowingCategories: number;
  totalFollowingTags: number;
};

export type DashboardInfoRes = {
  success: boolean;
  dashboardInfo: DashboardInfo;
};
