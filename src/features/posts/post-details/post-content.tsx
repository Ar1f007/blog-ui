import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import parse, { Element } from 'html-react-parser';
import { useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import paths from '../../../routes/paths';
import { calculateReadingTime } from '../../../utils';
import { formatTime } from '../../../utils/dateTime';

import type { PostDetails as PostDetailsType } from '../../../app/slices/posts/types';

import Comments from './comments';

type PostContent = PostDetailsType;

const parser = (input: string) =>
  parse(input, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs.class === 'remove') {
        return <></>;
      }
    },
  });

const styles = {
  postInfoText: {
    fontSize: {
      xs: '14px',
    },
    whiteSpace: 'nowrap',
  },
};

const showFromTablet = { xs: 'none', sm: 'block' };

export const Post = (props: PostContent) => {
  const { tags, description, category, coverImage, published_at, title } =
    props.post;
  const { photo, fullName } = props.author;

  const getTags = useMemo(
    () =>
      tags?.map((tag) => (
        <Chip
          key={tag.slug}
          component={Link}
          to={paths.tags + '/' + tag.slug}
          label={`#${tag.slug}`}
          size="small"
          variant="outlined"
          sx={{ mr: 1, cursor: 'pointer' }}
        />
      )),
    [tags],
  );

  const content = useMemo(() => {
    if (description) {
      return parser(description);
    }
  }, [description]);

  return (
    <Paper
      component="article"
      elevation={1}
      sx={{ borderRadius: 2, overflow: 'hidden' }}
    >
      <Stack>
        <Box>
          <LazyLoad
            height={200}
            once
          >
            <Box
              component="img"
              src={coverImage}
              alt="cover"
              sx={{ objectFit: 'cover', width: '100%' }}
            />
          </LazyLoad>
        </Box>

        {/* Content */}

        <Stack
          p={3}
          rowGap={3}
          flexWrap="wrap"
        >
          {/* Avatar & Post Info */}
          <Stack
            direction="row"
            columnGap={2}
          >
            <Avatar
              src={photo}
              alt={fullName}
            />

            {/* Name */}
            <Stack>
              <Typography
                fontSize="20px"
                fontWeight={500}
              >
                {fullName}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                {/* Published at */}
                {published_at && (
                  <Typography sx={styles.postInfoText}>
                    {formatTime(published_at)}
                  </Typography>
                )}

                <Divider orientation="vertical" />

                {/* Estimated reading time */}
                {description && (
                  <Typography sx={styles.postInfoText}>
                    {calculateReadingTime(description)}
                  </Typography>
                )}
                <Divider orientation="vertical" />

                {/* tags */}
                <Box display={showFromTablet}>{getTags}</Box>

                <Divider
                  orientation="vertical"
                  sx={{ display: showFromTablet }}
                />

                {/* category */}
                {category && (
                  <Typography
                    textTransform="capitalize"
                    component={Link}
                    to={paths.categories + '/' + category.slug}
                    sx={{
                      ...styles.postInfoText,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {category.name}
                  </Typography>
                )}
                {/* End of category */}
              </Stack>
            </Stack>
          </Stack>

          <Typography
            variant="h4"
            component="h1"
            letterSpacing="0.5px"
            fontWeight={500}
          >
            {title}
          </Typography>

          {description && <Box>{content}</Box>}
        </Stack>
      </Stack>

      <Comments />
    </Paper>
  );
};
