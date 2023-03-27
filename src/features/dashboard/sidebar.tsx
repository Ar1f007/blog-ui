import { Box, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGetDashboardInfoQuery } from '../../app/slices/users/user-dashboard-info-api';
import { useAppSelector } from '../../hooks/store';
import paths from '../../routes/paths';
import { createSXCollection } from '../../utils';

const styles = createSXCollection({
  linkContainer: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    px: 2,
    py: 1,
    borderRadius: 1,

    '&:hover': {
      backgroundColor: (t) => t.palette.grey['200'],
    },
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    fontWeight: 500,
  },
});

export const Sidebar = () => {
  const userId = useAppSelector((s) => s.user.data?.id);

  const { isLoading, data } = useGetDashboardInfoQuery(userId || '', {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const dashboardNavigation = useMemo(
    () => [
      {
        name: 'Posts',
        path: paths.dashboard.index,
        totalCount: data?.dashboardInfo.totalPosts,
      },
      {
        name: 'Followers',
        path: paths.dashboard.followers,
        totalCount: data?.dashboardInfo.totalFollowers,
      },
      {
        name: 'Following',
        path: paths.dashboard.followingUsers,
        totalCount: data?.dashboardInfo.totalFollowing,
      },
      {
        name: 'Following Categories',
        path: paths.dashboard.followingCategories,
        totalCount: data?.dashboardInfo.totalFollowingCategories,
      },
      {
        name: 'Following Tags',
        path: paths.dashboard.followingTags,
        totalCount: data?.dashboardInfo.totalFollowingTags,
      },
    ],
    [data?.dashboardInfo],
  );

  return (
    <Paper
      component="aside"
      elevation={4}
      sx={{ py: 2 }}
    >
      <List>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {dashboardNavigation.map((item, index) => (
              <ListItem key={index}>
                <Box
                  component={Link}
                  to={item.path}
                  sx={styles.linkContainer}
                >
                  <Stack sx={styles.linkWrapper}>
                    <Typography sx={styles.link}>{item.name}</Typography>
                    <Typography>{item.totalCount}</Typography>
                  </Stack>
                </Box>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Paper>
  );
};
