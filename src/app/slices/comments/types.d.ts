import type { UserDetails } from '../users/types';

type Commenter = {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  photo: string;
  active: string;
};

export type Comment = {
  _id: string;
  postId: string;
  commentDesc: string;
  createdAt: string;
  updatedAt: string;
  postSlug: string;
  commenter: UserDetails['user'];
};

export type CommentsData = {
  success: boolean;
  comments: Comment[];
  totalComments: number;
};
