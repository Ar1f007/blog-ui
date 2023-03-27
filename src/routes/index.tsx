import { createBrowserRouter } from 'react-router-dom';

import { Posts } from '../features/dashboard';
import { SingleCommentDesc } from '../features/posts';
import { AuthLayout, MainLayout, PostLayout } from '../layouts';
import { Dashboard, Home, SignUp, FourOhFour, PostDetails } from '../pages';
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
        path: `${paths.posts}/:slug`,
        element: <PostDetails />,
      },
      {
        path: `${paths.posts}/:postSlug/comments/:commentId`,
        element: <SingleCommentDesc />,
      },
      {
        path: paths.dashboard.index,
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Posts />,
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
    element: <FourOhFour />,
  },
]);

export default routes;
