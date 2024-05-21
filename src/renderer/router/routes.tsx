import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExploreIcon from '@mui/icons-material/Explore';

// 定义一个路由类型
export interface RouteItem {
  path: string;
  name: string;
  element: React.ReactElement;
  icon?: React.ReactElement;
  children?: RouteItem[];
}

// 定义一个路由数组
const routes: RouteItem[] = [
  {
    path: '/workshop',
    name: '创意工坊',
    element: <div>Home</div>,
    icon: <ExploreIcon />,
  },
  {
    path: '/workdesk',
    name: '工作台',
    element: <div>WorkDesk</div>,
    icon: <DashboardIcon />,
  },
  {
    path: '/workbench',
    name: '控制台',
    element: <div>Dashboard</div>,
    icon: <DashboardIcon />,
  },
  {
    path: '/profile',
    name: '个人中心',
    element: <div>About</div>,
    icon: <PersonIcon />,
  },
];

export default routes;
