import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import { Home, SignUp } from '../pages';

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
    path: paths.signUp,
    element: <SignUp />,
  },
  {
    path: '*',
    element: <>404</>,
  },
]);

export default routes;
