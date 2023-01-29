import Icons from '../utils/icons';

import paths from './paths';

const navigation = [
  { name: 'Home', href: paths.home },
  { name: 'Posts', href: paths.posts },
  { name: 'Create', href: paths.cretePost },
  { name: 'Login', href: paths.login },
  { name: 'Register', href: paths.signUp },
];

export const userNavigation = [
  { icon: Icons.NoteAltOutlined, name: 'Write', href: paths.newPost },
  { icon: Icons.ArticleOutlined, name: 'Posts', href: paths.myPost },
  { icon: Icons.BookmarksOutlined, name: 'Lists', href: paths.lists },
  { icon: Icons.DashboardCustomizeOutlined, name: 'Dashboard', href: paths.dashboard },
  { icon: Icons.Settings, name: 'Settings', href: paths.settings },
];

export default navigation;
