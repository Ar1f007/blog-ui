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
    <Stack rowGap={2}>
      <Typography
        variant="h6"
        component="h3"
      >
        Popular Hashtags
      </Typography>

      <Grid
        container
        spacing={1}
      >
        {tags?.map((tag) => (
          <Grid
            item
            key={tag.value}
            xs={3}
            lg={4}
          >
            <Chip
              component={Link}
              to={`/tags/${tag.slug}`}
              clickable
              label={`#${tag.slug}`}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
