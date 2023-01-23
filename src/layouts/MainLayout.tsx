import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const MainLayout = () => (
  <Fragment>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </Fragment>
);
export default MainLayout;
