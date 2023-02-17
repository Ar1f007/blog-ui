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
        sm: '-webkit-box',
      },
      lineClamp: 3,
      overflow: 'hidden',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    }}
  >
    {excerpt}
  </Box>
);

const CardFooter = () => (
  <Stack
    direction="row"
    spacing={3}
  >
    <Box sx={{ fontSize: '13px' }}>3 days ago</Box>

    <Box sx={{ fontSize: '13px' }}>8 min read</Box>

    <Box
      flexGrow={1}
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
      }}
    />

    <Box sx={{ fontSize: '13px' }}>Design</Box>

    <Box sx={{ fontSize: '13px' }}>127 reactions </Box>
  </Stack>
);

export const Post: FC<PostProps> = ({ showHeader = false }) => {
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
              <CardTitle title="Compound components pattern for creating reusable Rating component" />

              <CardExcerpt excerpt="The environment of web interaction is diverse. And to ensure outstanding user experience across all devices, businesses are bound to invest in mobile" />
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
