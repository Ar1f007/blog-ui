import { Avatar, Box } from '@mui/material';

import type { FC } from 'react';

type PostProps = {
  showHeader: boolean;
};

export const Post: FC<PostProps> = ({ showHeader }) => {
  const p = (
    <>
      <Avatar />
    </>
  );
  return <Box>{showHeader && p}</Box>;
};
