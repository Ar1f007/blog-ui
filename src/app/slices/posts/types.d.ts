import type { CreatePostPayload } from '../../../features/posts/validations/create-post';
import type { SerializedError } from '@reduxjs/toolkit';

type CreatePostWithoutImage = Record<string, string | object | []>;

export type CreatePost = {
  payload: CreatePostWithoutImage | FormData;
  coverImgIncluded: boolean;
};

type Topic = {
  _id: string;
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

export type Author = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photo: string;
  email: string;
  followers: number;
  joined: string;
  address: string;
  bio: string;
};

type PostContent = {
  id: string;
  slug: string;
  coverImage: string;
  title: string;
  description: string;
  views: number;
  isLiked: boolean;
  likesCount: number;
  likes: [string];
  published_at: string;
  category: Topic;
  tags: Topic[];
  totalComments: number;
};

export type PostDetails = {
  author: Author;
  post: PostContent;
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
  currentlyViewedPost: PostDetails | null;
};

export type ReactionPayload = {
  userId: string;
  postId: string;
};

type StringOrUndefined = string | undefined;

export type IsLikedQuery = {
  userId: StringOrUndefined;
  postId: StringOrUndefined;
};

export type IsLikedQueryRes = {
  success: boolean;
  isLiked: boolean;
};
