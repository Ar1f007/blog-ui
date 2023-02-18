import { Stack } from '@mui/material';

import { SubHeading } from '../../components';

import { Article } from './article-card';

export const RecentReads = () => (
  <Stack rowGap={2}>
    <SubHeading title="Recent Reads" />
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
  </Stack>
);
