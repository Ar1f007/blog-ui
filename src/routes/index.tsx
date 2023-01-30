import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout, MainLayout, PostLayout } from '../layouts';
import { Home, SignUp } from '../pages';
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
    element: <PostLayout />,
    children: [
      {
        path: paths.newPost,
        element: <AddPost />,
      },
    ],
  },
  {
    path: '*',
    element: <>404</>,
  },
]);

export default routes;
