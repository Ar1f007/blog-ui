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
import { calculateReadingTime, createSXCollection } from '../../utils';
import { formatTimeFromNow } from '../../utils/dateTime';

import type { Post as PostAttrs } from '../../app/slices/posts/types';
import type { FC } from 'react';

type PostProps = { showHeader: boolean } & PostAttrs;

type CardExcerptProps = {
  excerpt: string;
};

type LinkWrapperProps = {
  children: JSX.Element;
  path: string;
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

const Info: FC<
  Pick<
    PostProps,
    'category' | 'likesCount' | 'slug' | 'createdAt' | 'description'
  >
> = ({ category, likesCount, slug, createdAt, description }) => (
  <>
    <Stack
      direction="row"
      columnGap={1}
      rowGap={1}
      justifyContent="space-between"
    >
      <LinkWrapper path={paths.posts + '/' + slug}>
        <Box sx={styles.infoText}>{formatTimeFromNow(createdAt)}</Box>
      </LinkWrapper>

      <Divider
        orientation="vertical"
        flexItem
      />
      <LinkWrapper path={paths.posts + '/' + slug}>
        <Box sx={styles.infoText}>{calculateReadingTime(description)}</Box>
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

      <LinkWrapper path={paths.categories + '/' + category?.slug}>
        <Box sx={styles.infoText}>{category?.name}</Box>
      </LinkWrapper>

      <Divider
        orientation="vertical"
        flexItem
      />

      <LinkWrapper path={paths.posts + '/' + slug}>
        <Box sx={styles.infoText}>
          {likesCount}&nbsp;
          {likesCount > 0 ? 'reactions' : 'reaction'}
        </Box>
      </LinkWrapper>
    </Stack>
  </>
);

const LinkWrapper: FC<LinkWrapperProps> = ({ children, path }) => (
  <Box
    component={Link}
    to={path}
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
  createdAt,
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
              <LinkWrapper path={paths.posts + '/' + slug}>
                <CardTitle title={title} />
              </LinkWrapper>

              <LinkWrapper path={paths.posts + '/' + slug}>
                <CardExcerpt excerpt={description.slice(0, 300)} />
              </LinkWrapper>
            </Grid>

            <Grid
              item
              xs={4}
            >
              <LinkWrapper path={paths.posts + '/' + slug}>
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
              createdAt={createdAt}
              description={description}
            />
          </Grid>
          <Divider />
        </Stack>
      </CardContent>
    </Card>
  );
};
