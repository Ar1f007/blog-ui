import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import type { FC } from 'react';

const url =
  'https://images.unsplash.com/photo-1669054626218-f0b57b8ec632?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

type PostProps = {
  showHeader: boolean;
};

type CardTitleProps = {
  title: string;
};

type CardExcerptProps = {
  excerpt: string;
};

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
        sm: 'block',
      },
      lineClamp: 2,
    }}
  >
    {excerpt}
  </Box>
);

const CardFooter = () => (
  <Stack
    direction={{
      lg: 'row',
    }}
    justifyContent={{
      lg: 'space-between',
    }}
    spacing={3}
  >
    <Stack
      direction="row"
      columnGap={2}
    >
      <Box>3 days ago</Box>
      <Divider orientation="vertical" />

      <Box>8 min read</Box>
      <Divider orientation="vertical" />

      <Box>Design</Box>
    </Stack>

    <Stack
      direction="row"
      columnGap={2}
    >
      <Box>likes 2</Box>
      <Divider orientation="vertical" />

      <Box>comments 2</Box>
    </Stack>
  </Stack>
);

export const Post: FC<PostProps> = ({ showHeader }) => {
  const cardHeader = (
    <CardHeader>
      <Avatar />
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
              <CardTitle title="Compound components pattern for creating reusable Rating component" />

              <CardExcerpt excerpt="The environment of web interaction is diverse. And to ensure outstanding user experience across all devices, businesses are bound to invest in mobile  See more..." />
            </Grid>

            <Grid
              item
              xs={4}
            >
              <CardMedia
                component="img"
                sx={{ width: '100%' }}
                image={url}
                alt="Live from space album cover"
              />
            </Grid>
          </Grid>

          <CardFooter />
          <Divider />
        </Stack>
      </CardContent>
    </Card>
  );
};
