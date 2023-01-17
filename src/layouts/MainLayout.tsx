import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
export default MainLayout;
