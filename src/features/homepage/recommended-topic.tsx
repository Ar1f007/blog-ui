import { Chip, Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCategoriesAction } from '../../app/slices/categories';
import { SubHeading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import paths from '../../routes/paths';

export const RecommendedTopics = () => {
  const { data, loading } = useAppSelector((s) => s.category);

  const dispatch = useAppDispatch();
  const actions = bindActionCreators(
    {
      getCategoriesAction,
    },
    dispatch,
  );

  useEffect(() => {
    if (!data.length) {
      actions.getCategoriesAction();
    }
  }, [data, actions]);

  if (loading === 'pending') {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!!data?.length && (
        <Stack rowGap={2}>
          <SubHeading title="Recommended Topics" />

          <Stack
            direction="row"
            columnGap={1}
            rowGap={1}
            flexWrap="wrap"
          >
            {data.map((category) => (
              <Chip
                component={Link}
                to={`${paths.categories}/${category.slug}`}
                key={category.slug}
                label={category.label}
                variant="outlined"
                clickable
              />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};
