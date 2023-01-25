import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout, MainLayout } from '../layouts';
import { Home, SignUp } from '../pages';
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
    path: '*',
    element: <>404</>,
  },
]);

export default routes;
