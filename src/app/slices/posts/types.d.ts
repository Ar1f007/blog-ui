import type { CreatePostPayload } from '../../../features/posts/validations/create-post';
import type { SerializedError } from '@reduxjs/toolkit';

type CreatePostWithoutImage = Record<string, string | object | []>;

export type CreatePost = {
  payload: CreatePostWithoutImage | FormData;
  coverImgIncluded: boolean;
};

export type UpdatePost = CreatePost & {
  postId: string;
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
  _id: string;
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
  isBookmarked: boolean;
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

export type ReactionCountRes = {
  success: boolean;
  reactionCount: number;
};

type StringOrUndefined = string | undefined;

export type IsLikedQuery = {
  userId: StringOrUndefined;
  postId: StringOrUndefined;
};

type PostInfoQueryRes = {
  success: boolean;
  isLiked: boolean;
};

export type IsLikedQueryRes = PostInfoQueryRes;

export type IsBookmarkedRes = PostInfoQueryRes & { isBookmarked: boolean };

export type BookmarkParams = {
  userId: StringOrUndefined;
  postId: StringOrUndefined;
};

export type AuthorPostsRes = {
  success: boolean;
  posts: Post[];
};

export type MenuOptions = {
  label: string;
  identifier: 'view-post' | 'edit-post' | 'delete-post';
};
