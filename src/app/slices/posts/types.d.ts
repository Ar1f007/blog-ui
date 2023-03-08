import type { CreatePostPayload } from '../../../features/posts/validations/create-post';
import type { SerializedError } from '@reduxjs/toolkit';

type CreatePostWithoutImage = Record<string, string | object | []>;

export type CreatePost = {
  payload: CreatePostWithoutImage | FormData;
  coverImgIncluded: boolean;
};

type Topic = {
  id: string;
  name: string;
  slug: string;
};

export type Post = {
  slug: string;
  title: string;
  category: Topic;
  tags: Topic[];
  numViews: number;
  isLiked: boolean;
  likes: [string];
  likesCount: number;
  author: {
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    bio: string;
    followers: [string];
    address: string;
    createdAt: string;
  };
  description: string;
  coverImage: string;
  published_at: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostServerError = keyof CreatePostPayload;

type ApiError = {
  success?: boolean;
  errors?: {
    fieldName: CreatePostServerError;
    message: string;
  }[];
} & SerializedError;

export type PostsState = {
  loading: boolean;
  currentPost: Post | null;
  posts: Post[] | [];
  error: ApiError | null;
};
