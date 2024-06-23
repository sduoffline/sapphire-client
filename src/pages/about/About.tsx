import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const UserGrid = ({
  src,
  name,
  size,
  link,
}: {
  src: any;
  name: any;
  size?: any;
  link?: any;
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <IconButton>
      <Link to={link} target="_blank">
        <Avatar src={src} sx={{ height: size ?? 60, width: size ?? 60 }} />
      </Link>
    </IconButton>
    <Typography variant={size && size > 60 ? "h6" : "body1"} color={grey[700]}>
      {name}
    </Typography>
  </Box>
);

export default function About() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper sx={{ p: 3, width: "70%", minWidth: "500px" }}>
        <Typography variant="h5">指导老师</Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UserGrid
            link="https://www.sc.sdu.edu.cn/info/1041/2196.htm"
            src="/avatars/wlavatar.png"
            size={100}
            name="武蕾老师"
          />
        </Box>
        <Typography variant="h5" sx={{ mt: 1 }}>
          项目成员
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <UserGrid
            src="/avatars/hyqavatar.jpg"
            link="https://blog.csdn.net/ellyi/category_12620990.html"
            size={60}
            name="侯玉祺"
          />
          <UserGrid
            src="/avatars/gsravatar.jpg"
            link="https://blog.csdn.net/qq_40068267/category_12620988.html"
            size={60}
            name="郭苏睿"
          />
          <UserGrid
            src="/avatars/wxyavatar.jpg"
            link="https://blog.csdn.net/wxyww2049/category_12621009.html"
            size={60}
            name="吴羲勇"
          />
          <UserGrid
            src="/avatars/mljavatar.png"
            link="https://blog.csdn.net/u012185664/category_12621022.html"
            size={60}
            name="朱哲甬"
          />
          <UserGrid
            src="/avatars/wyqavatar.jpg"
            link="https://blog.csdn.net/xi_irra/category_12621018.html"
            size={60}
            name="伍钰棋"
          />
        </Box>
        <Typography variant="h5" sx={{ mt: 3 }}>
          前端工作
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src="/avatars/frontwork.png" />
        </Box>
        <Typography variant="h5" sx={{ mt: 3 }}>
          后端工作
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src="/avatars/backendwork.png" />
        </Box>
      </Paper>
    </Box>
  );
}
