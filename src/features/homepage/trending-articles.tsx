import { Divider, Stack } from '@mui/material';

import { SubHeading } from '../../components';

import { Article } from './article-card';

export const TrendingArticles = () => (
  <>
    <Stack rowGap={2}>
      <SubHeading title="Trending OMG Articles 🔥" />

      <Stack rowGap={3}>
        <Article
          author="John Doe"
          articleTitle="Think in a redux way"
          authorAvatar="#"
          slug="think-in-a-react-way"
        />

        <Article
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
