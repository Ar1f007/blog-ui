import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../routes/paths';
import { createSXCollection } from '../../utils';

import type { Post as PostAttrs } from '../../app/slices/posts/types';
import type { FC } from 'react';

type PostProps = { showHeader: boolean } & PostAttrs;

type CardExcerptProps = {
  excerpt: string;
};

type LinkWrapperProps = {
  children: JSX.Element;
  slug: string;
};

const styles = createSXCollection({
  container: {
    color: 'inherit',
    textDecoration: 'none',
  },

  infoText: {
    fontSize: '1.3rem',
    color: 'grey.main',
  },
});

const CardTitle: FC<Pick<PostAttrs, 'title'>> = ({ title }) => (
  <Typography
    component="h3"
    variant="h6"
    sx={{
      display: '-webkit-box',
      lineClamp: 2,
      overflow: 'hidden',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      fontSize: {
        xs: '1.6rem',
        lg: '2rem',
      },
    }}
  >
    {title}
  </Typography>
);

const CardExcerpt: FC<CardExcerptProps> = ({ excerpt }) => (
  <Box
    component="p"
    sx={{
      display: {
        xs: 'none',
        sm: '-webkit-box',
      },
      lineClamp: 3,
      overflow: 'hidden',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    }}
    dangerouslySetInnerHTML={{ __html: excerpt }}
  />
);

const Info: FC<Pick<PostProps, 'category' | 'likesCount' | 'slug'>> = ({
  category,
  likesCount,
  slug,
}) => (
  <Stack
    direction="row"
    columnGap={1}
    rowGap={1}
    justifyContent="space-between"
  >
    <LinkWrapper slug={slug}>
      <Box sx={styles.infoText}>3 days ago</Box>
    </LinkWrapper>

    <Divider
      orientation="vertical"
      flexItem
    />
    <LinkWrapper slug={slug}>
      <Box sx={styles.infoText}>8 min read</Box>
    </LinkWrapper>

    <Divider
      orientation="vertical"
      flexItem
      sx={{
        display: {
          sm: 'none',
        },
      }}
    />

    <Box
      flexGrow={1}
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
      }}
    />

    <Box sx={styles.infoText}>{category?.name}</Box>

    <Divider
      orientation="vertical"
      flexItem
    />

    <LinkWrapper slug={slug}>
      <Box sx={styles.infoText}>
        {likesCount}&nbsp;
        {likesCount > 0 ? 'reactions' : 'reaction'}
      </Box>
    </LinkWrapper>
  </Stack>
);

const LinkWrapper: FC<LinkWrapperProps> = ({ children, slug }) => (
  <Box
    component={Link}
    to={paths.posts + '/' + slug}
    sx={styles.container}
  >
    {children}
  </Box>
);

export const Post: FC<PostProps> = ({
  showHeader,
  title,
  description,
  category,
  coverImage,
  likesCount,
  author,
  slug,
}) => {
  const authorName = `${author?.firstName || ''} ${author?.lastName || ''}`;

  const cardHeader = (
    <CardHeader
      avatar={
        <Avatar
          src={author?.photo}
          alt={author?.firstName}
        />
      }
      title={authorName}
      sx={{
        '.MuiCardHeader-title': {
          fontWeight: 500,
          color: 'colorGrey.main',
        },
        pb: 0,
      }}
    />
  );

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: 'transparent' }}
    >
      {showHeader && cardHeader}

      <CardContent>
        <Stack spacing={3}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={8}
            >
              <LinkWrapper slug={slug}>
                <CardTitle title={title} />
              </LinkWrapper>

              <LinkWrapper slug={slug}>
                <CardExcerpt excerpt={description.slice(0, 300)} />
              </LinkWrapper>
            </Grid>

            <Grid
              item
              xs={4}
            >
              <LinkWrapper slug={slug}>
                <CardMedia
                  component="img"
                  sx={{ width: '100%' }}
                  image={coverImage}
                  alt={title}
                />
              </LinkWrapper>
            </Grid>
          </Grid>

          <Grid item>
            <Info
              category={category}
              likesCount={likesCount}
              slug={slug}
            />
          </Grid>
          <Divider />
        </Stack>
      </CardContent>
    </Card>
  );
};
