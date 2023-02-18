import { Avatar, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../routes/paths';
import { createSXCollection } from '../../utils';

import type { FC } from 'react';

type PostProps = {
  articleTitle: string;
  author: string;
  authorAvatar: string;
  slug: string;
};

const styles = createSXCollection({
  article: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export const TrendingArticle: FC<PostProps> = (props) => {
  const { author, authorAvatar, articleTitle, slug } = props;

  return (
    <Box
      component={Link}
      to={paths.posts + '/' + slug}
      sx={styles.article}
    >
      <Stack rowGap={1}>
        <Stack
          direction="row"
          alignItems="center"
          columnGap={1}
        >
          <Avatar
            src={authorAvatar}
            alt={author}
            sx={{
              width: '30px',
              height: '30px',
            }}
          />
          <Typography
            variant="caption"
            component="h4"
          >
            {author}
          </Typography>
        </Stack>

        <Typography
          variant="subtitle1"
          component="h3"
          fontWeight="bold"
        >
          {articleTitle}
        </Typography>
      </Stack>
    </Box>
  );
};
