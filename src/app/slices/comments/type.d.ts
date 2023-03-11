type Commenter = {
  userId: string;
  fullName: string;
};

type Comment = {
  _id: string;
  post: string;
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
