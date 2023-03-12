import { List, ListItem, ListItemText, Paper } from '@mui/material';

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
    <List>
      {dashboardNavigation.map((link, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={link.name}
            secondary={10000}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          />
          {/* <Link to={link.path}>{link.name}</Link> */}
        </ListItem>
      ))}
    </List>
  </Paper>
);
