import { Typography } from '@mui/material';

import type { FC } from 'react';

type SubHeadingProps = {
  title: string;
};

export const SubHeading: FC<SubHeadingProps> = ({ title }) => (
  <Typography
    variant="h6"
    component="h2"
  >
    {title}
  </Typography>
);
