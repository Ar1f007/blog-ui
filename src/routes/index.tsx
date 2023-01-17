import { useRoutes } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home';

import paths from './paths';

const MainRoutes = () => {
  const element = useRoutes([
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
      element: (
        <>
          <h1>Not Found</h1>
        </>
      ),
    },
  ]);

  return element;
};

export default MainRoutes;
