import React, { useState } from 'react';
import {
  MemoryRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutlet,
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import routes from './routes';
import NotFoundPage from '../pages/common/404';
import Workshop from '../pages/workshop/Workshop';
import Workbench from '../pages/workbench/Workbench';
import DatasetDetail from '../pages/dataset/DatasetDetail';
import Profile from '../pages/profile/Profile';
import CreateDataset from '../pages/dataset/CreateDataset';
import Setting from '../pages/setting/Setting';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// 多数页面使用的基本组件
// 包括侧边栏、顶部栏、底部栏等
// 根据权限、用户信息等动态渲染
function BaseWrapper() {
  // 开关侧边栏
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // 获取当前路由
  const location = useLocation();

  // 路由跳转
  const navigator = useNavigate();

  // 获取当前路由的子路由
  const outlet = useOutlet();

  const handleClick = (path: string) => {
    navigator(path);
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* 根据路由动态渲染标题 */}
            {routes.find((route) => route.path === location.pathname)?.name}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <DrawerHeader>
          <Typography
            variant="h6"
            sx={{
              // 字间距大一点
              letterSpacing: 2,
              // 字重大一点
              fontWeight: 'bold',
              // 水平方向加一些margin
              ml: 2,
            }}
          >
            Sapphire
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route) => (
            <ListItem key={route.path} disablePadding>
              <ListItemButton
                selected={route.path === location.pathname}
                onClick={() => handleClick(route.path)}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div style={{ flexGrow: 1 }} />
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => handleClick('/setting')}>
            <ListItemButton>
              <ListItemText primary="设置" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="关于" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Container
        sx={{
          paddingTop: 2,
        }}
      >
        {outlet}
      </Container>
    </div>
  );
}

function BaseRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseWrapper />}>
          <Route path="/workbench" element={<Workbench />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="dataset">
            <Route path="detail/:id" element={<DatasetDetail />} />
            <Route path="create" element={<CreateDataset />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<BaseWrapper />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default BaseRouter;
