import React, { useEffect, useState } from "react";
import {
  MemoryRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutlet,
  HashRouter,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import routes from "./routes";
import NotFoundPage from "../pages/common/404";
import Workshop from "../pages/workshop/Workshop";
import ConsoleBoard from "../pages/consoleboard/ConsoleBoard";
import DatasetDetail from "../pages/dataset/DatasetDetail";
import Profile from "../pages/profile/Profile";
import CreateDataset from "../pages/dataset/CreateDataset";
// import Setting from "../pages/setting/Setting.tsx";
import WorkDesk from "../pages/workdesk/WorkDesk";
import { Avatar, Box, Menu, MenuItem, Tooltip } from "@mui/material";
import Datasets from "../pages/datasets/Datasets";
import Login from "../pages/login";
import UpdDataset from "../pages/dataset/UpdDataset";
import Setting from "../pages/setting/Setting";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// 多数页面使用的基本组件
// 包括侧边栏、顶部栏、底部栏等
// 根据权限、用户信息等动态渲染
function BaseWrapper(props: any) {
  // 开关侧边栏
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [anchorElUser, setAnchorElUser] = useState<boolean>(false);
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
            {/* {routes.find((route) => route.path === location.pathname)?.name} */}
            {props?.name}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton
                onClick={() => setAnchorElUser(!anchorElUser)}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={localStorage.getItem("name") as string}
                  src={localStorage.getItem("avatar") as string}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              // anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(false)}
            >
              {/* <MenuItem> */}
              <Box sx={{ marginLeft: "10px", marginRight: "10px" }}>
                <Typography
                  textAlign="center"
                  variant="body1"
                  sx={{ fontFamily: "cursive" }}
                >
                  你好,{localStorage.getItem("name")}同志
                </Typography>
                {/* </MenuItem> */}

                <MenuItem
                  onClick={() => {
                    setAnchorElUser(false);
                    navigator("/profile");
                  }}
                >
                  <Typography textAlign="center">个人中心</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("name");
                    localStorage.removeItem("token");
                    navigator("/");
                  }}
                >
                  <Typography textAlign="center">登出</Typography>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
          {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
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
              fontWeight: "bold",
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
          <ListItem disablePadding onClick={() => handleClick("/setting")}>
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
      <Box
        sx={{
          padding: "20px 100px 0px 100px",
          height: `calc(100vh - 64px)`,
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}

function BaseRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/">
          <Route
            path="/workbench"
            element={
              <Index name="控制台">
                <ConsoleBoard />
              </Index>
            }
          />
          <Route
            path="/workshop"
            element={
              <Index name="创意工坊">
                <Workshop />
              </Index>
            }
          />
          <Route
            path="/workdesk"
            element={
              <Index name="工作台">
                <WorkDesk />
              </Index>
            }
          />
          <Route
            path="/datasets"
            element={
              <Index name="我的数据集">
                <Datasets />
              </Index>
            }
          />
          <Route path="dataset">
            <Route
              path="detail/:id"
              element={
                <Index name="任务集详情">
                  <DatasetDetail />
                </Index>
              }
            />
            <Route
              path="update/:datasetId"
              element={
                <Index name="创建数据集">
                  <UpdDataset />
                </Index>
              }
            />
          </Route>
          <Route
            path="/profile"
            element={
              <Index name="个人中心">
                <Profile />
              </Index>
            }
          />
          <Route
            path="/setting"
            element={
              <Index name="设置">
                <Setting />
              </Index>
            }
          />
        </Route>
        <Route path="*" element={<BaseWrapper />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
const Index = (props: any) => {
  return <BaseWrapper name={props.name}>{props.children}</BaseWrapper>;
};
export default BaseRouter;
