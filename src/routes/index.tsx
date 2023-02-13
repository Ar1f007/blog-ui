import { createBrowserRouter } from 'react-router-dom';

import { PostStats } from '../features/dashboard';
import { AuthLayout, MainLayout, PostLayout } from '../layouts';
import { Dashboard, Home, SignUp } from '../pages';
import AddPost from '../pages/add-post';
import Login from '../pages/login';

import paths from './paths';

export const routes = createBrowserRouter([
  {
    path: paths.home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PostLayout />,
        children: [
          {
            path: paths.newPost,
            element: <AddPost />,
          },
        ],
      },
      {
        path: paths.dashboard,
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <PostStats />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: paths.signUp,
        element: <SignUp />,
      },
      {
        path: paths.login,
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <>404</>,
  },
]);

export default routes;
