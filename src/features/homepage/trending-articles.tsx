import { Divider, Stack } from '@mui/material';

import { SubHeading } from '../../components';

import { TrendingArticle } from './trending-article';

export const TrendingArticles = () => (
  <>
    <Stack
      rowGap={2}
      marginTop="1.6rem"
    >
      <SubHeading title="Trending OMG Articles 🔥" />

      <Stack rowGap={3}>
        <TrendingArticle
          author="John Doe"
          articleTitle="Think in a redux way"
          authorAvatar="#"
          slug="think-in-a-react-way"
        />

        <TrendingArticle
          author="John Doe"
          articleTitle="Think in a redux way"
          authorAvatar="#"
          slug="think-in-a-react-way"
        />
      </Stack>
      <Divider />
    </Stack>
  </>
);
