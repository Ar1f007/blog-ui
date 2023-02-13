import { MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../routes/paths';

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

export const Sidebar = () => (
  <Paper
    component="aside"
    elevation={4}
    sx={{ p: 3 }}
  >
    <MenuList>
      {dashboardNavigation.map((link, index) => (
        <MenuItem key={index}>
          <Link to={link.path}>{link.name}</Link>
        </MenuItem>
      ))}
    </MenuList>
  </Paper>
);
