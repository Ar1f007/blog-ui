import { Box, Stack } from '@mui/material';

import { Hashtags } from './hashtags';
import { RecentReads } from './recent-reads';
import { RecommendedTopics } from './recommended-topic';
import { TrendingArticles } from './trending-articles';

export const RightSidebar = () => (
  <Box
    component="aside"
    pt="1.6rem"
  >
    <Stack rowGap={2}>
      <Hashtags />

      <TrendingArticles />

      <RecommendedTopics />
      <RecentReads />
    </Stack>
  </Box>
);
