import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home';

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
    path: '*',
    element: <>404</>,
  },
]);

export default routes;
