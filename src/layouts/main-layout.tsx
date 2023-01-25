import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '.';

const MainLayout = () => (
  <Fragment>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </Fragment>
);
export default MainLayout;
