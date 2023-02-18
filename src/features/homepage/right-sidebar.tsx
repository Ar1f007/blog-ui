import { Box } from '@mui/material';

import { Hashtags } from './hashtags';
import { TrendingArticles } from './trending-articles';

export const RightSidebar = () => (
  <Box
    component="aside"
    pt="1.6rem"
  >
    <Hashtags />

    <TrendingArticles />
  </Box>
);
