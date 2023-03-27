import { Box, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../routes/paths';
import { createSXCollection } from '../../utils';

const dashboardNavigation = [
  {
    name: 'Posts',
    path: paths.dashboard.index,
  },
  {
    name: 'Series',
    path: paths.dashboard.series,
  },
  {
    name: 'Followers',
    path: paths.dashboard.followers,
  },
  {
    name: 'Following',
    path: paths.dashboard.followingUsers,
  },
  {
    name: 'Following Categories',
    path: paths.dashboard.followingCategories,
  },
  {
    name: 'Following Tags',
    path: paths.dashboard.followingTags,
  },
];

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

export const Sidebar = () => (
  <Paper
    component="aside"
    elevation={4}
    sx={{ py: 2 }}
  >
    <List>
      {dashboardNavigation.map((link, index) => (
        <ListItem key={index}>
          <Box
            component={Link}
            to={link.path}
            sx={styles.linkContainer}
          >
            <Stack sx={styles.linkWrapper}>
              <Typography sx={styles.link}>{link.name}</Typography>
              <Typography>1000</Typography>
            </Stack>
          </Box>
        </ListItem>
      ))}
    </List>
  </Paper>
);
