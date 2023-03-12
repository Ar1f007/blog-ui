type Commenter = {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  photo: string;
};

export type Comment = {
  _id: string;
  postId: string;
  user: Commenter;
  commentDesc: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentsData = {
  success: boolean;
  comments: Comment[];
  totalComments: number;
};
