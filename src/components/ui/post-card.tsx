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

import { createSXCollection } from '../../utils';

import type { FC } from 'react';

const url =
  'https://images.unsplash.com/photo-1669054626218-f0b57b8ec632?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

type PostProps = {
  showHeader: boolean;
  title: string;
  description: string;
  coverImage: string;
  likesCount: number;
  category: string;
};

type CardTitleProps = {
  title: string;
};

type CardExcerptProps = {
  excerpt: string;
};

const styles = createSXCollection({
  cardFooterText: {
    fontSize: '1.3rem',
    color: 'grey.main',
  },
});

const CardTitle: FC<CardTitleProps> = ({ title }) => (
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

const CardFooter: FC<Pick<PostProps, 'category' | 'likesCount'>> = ({
  category,
  likesCount,
}) => (
  <Stack
    direction="row"
    columnGap={1}
    rowGap={1}
    justifyContent="space-between"
  >
    <Box sx={styles.cardFooterText}>3 days ago</Box>

    <Divider
      orientation="vertical"
      flexItem
    />

    <Box sx={styles.cardFooterText}>8 min read</Box>

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

    <Box sx={styles.cardFooterText}>{category}</Box>

    <Divider
      orientation="vertical"
      flexItem
    />

    <Box sx={styles.cardFooterText}>
      {likesCount}&nbsp;
      {likesCount > 0 ? 'reactions' : 'reaction'}
    </Box>
  </Stack>
);

export const Post: FC<PostProps> = ({
  showHeader = false,
  title,
  description,
  category,
  coverImage,
  likesCount,
}) => {
  const cardHeader = (
    <CardHeader>
      {/* <Avatar
        url="./jpg"
        alt="Arif"
      /> */}
    </CardHeader>
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
              <CardTitle title={title || 'N/A'} />

              <CardExcerpt excerpt={description.slice(0, 300)} />
            </Grid>

            <Grid
              item
              xs={4}
            >
              <CardMedia
                component="img"
                sx={{ width: '100%' }}
                image={coverImage}
                alt={title}
              />
            </Grid>
          </Grid>

          <CardFooter
            category={category}
            likesCount={likesCount}
          />
          <Divider />
        </Stack>
      </CardContent>
    </Card>
  );
};
