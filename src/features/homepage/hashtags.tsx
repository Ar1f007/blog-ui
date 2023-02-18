import { Chip, Grid, Stack, Typography } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAllTagActions } from '../../app/slices/tags/action';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

export const Hashtags = () => {
  const dispatch = useAppDispatch();
  const action = bindActionCreators({ getAllTagActions }, dispatch);
  const tags = useAppSelector((s) => s.tag.data);

  useEffect(() => {
    if (!tags.length) {
      action.getAllTagActions();
    }
  }, [action, tags.length]);

  return (
    <>
      {!!tags.length && (
        <Stack rowGap={1.5}>
          <Typography
            variant="h6"
            component="h3"
          >
            Popular Hashtags
          </Typography>

          <Stack
            direction="row"
            columnGap={1}
            rowGap={1}
            flexWrap="wrap"
          >
            {tags.map((tag) => (
              <Chip
                component={Link}
                to={`/tags/${tag.slug}`}
                clickable
                label={`#${tag.slug}`}
                key={tag.slug}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};
