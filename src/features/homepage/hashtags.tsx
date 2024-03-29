import { Chip, Divider, Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAllTagActions } from '../../app/slices/tags/action';
import { SubHeading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

export const Hashtags = () => {
  const dispatch = useAppDispatch();
  const action = bindActionCreators({ getAllTagActions }, dispatch);
  const { data: tags, error } = useAppSelector((s) => s.tag);

  useEffect(() => {
    if (!tags.length && !error) {
      action.getAllTagActions();
    }
  }, [action, tags.length, error]);

  return (
    <>
      {!!tags.length && (
        <Stack rowGap={1.5}>
          <SubHeading title="Popular Hashtags" />

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

          <Divider />
        </Stack>
      )}
    </>
  );
};
