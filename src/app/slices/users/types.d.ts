export type RegisterPayload = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type ErrorObj = {
  [k: string]: [string];
  message: string;
};

export type UserState = {
  loading: boolean;
  data: User | null;
  error:
    | {
        success?: boolean;
        message?: string;
        errors?: {
          fieldName: string;
          message: string;
        }[];
      }
    | string
    | null;
};
