import { Box } from '@mui/material';

import type { SxProps } from '@mui/material';
import type { FC } from 'react';

type Props = {
  icon: JSX.Element | string;
  sx?: SxProps;
};

const Icon: FC<Props> = ({ icon, sx, ...others }) => (
  <Box
    component="i"
    sx={{ ...sx }}
    {...others}
  >
    {icon}
  </Box>
);

export default Icon;
