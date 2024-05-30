import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import avatarImg from "./img/avatar.jpg";
import background from "./img/background.jpg";
import i1 from "./img/images/冰川.png";
import i2 from "./img/images/彩虹.png";
import i3 from "./img/images/城市公园.png";
import i4 from "./img/images/海上.png";
import i5 from "./img/images/河流.png";
import i6 from "./img/images/火山.png";
import i7 from "./img/images/落日.png";
import i8 from "./img/images/麦田.png";
import i9 from "./img/images/瀑布.png";
import i10 from "./img/images/秋天.png";
import i11 from "./img/images/沙漠.png";
import i12 from "./img/images/沙滩.png";
import i13 from "./img/images/山水.png";
import i14 from "./img/images/树丛.png";
import i15 from "./img/images/树苗.png";
import i16 from "./img/images/松树.png";
import i17 from "./img/images/天气.png";
import i18 from "./img/images/峡谷.png";
import i19 from "./img/images/小岛.png";
import i20 from "./img/images/星空.png";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Introduction.css";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import InterestsIcon from "@mui/icons-material/Interests";
import {
  Paper,
  Grid,
  Avatar,
  Box,
  Typography,
  Link,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Masonry from "@mui/lab/Masonry";

export default function Introduction() {
  const src = [i1, i14, i13, i12, i10, i17, i18, i16, i20];
  const [open, setOpen] = useState(1);
  const createSrc = () => {
    let path = src[Math.floor(Math.random() * 20)];
    // console.log(path);
    return path;
  };

  const heights = [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150];
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [open10, setOpen10] = useState(false);
  const [open11, setOpen11] = useState(false);
  const [open12, setOpen12] = useState(false);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["个人主页", "项目工作", "关于我"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                setOpen(index + 1);
              }}
            >
              <ListItemIcon>
                {index === 0 && (
                  <InterestsIcon color="primary" sx={{ minWidth: "55px" }} />
                )}
                {index === 1 && (
                  <ModeEditOutlineRoundedIcon
                    color="primary"
                    sx={{ minWidth: "55px" }}
                  />
                )}
                {index === 2 && (
                  <FaceRetouchingNaturalIcon
                    color="primary"
                    sx={{ minWidth: "55px" }}
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  }));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Paper
        sx={{ width: "100%", height: 665, paddingTop: 10 }}
        className="total"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sm={12}>
            <Paper sx={{ width: "98%", height: 620, marginLeft: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  src={avatarImg}
                  sx={{ width: 100, height: 100, mt: 1 }}
                ></Avatar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 2,
                  mt: 2,
                }}
              >
                <Typography>
                  姓名:
                  <Typography
                    color="primary"
                    component="span"
                    sx={{ marginLeft: 1 }}
                  >
                    王治松
                  </Typography>
                </Typography>
                <Typography>
                  性别:
                  <Typography
                    color="primary"
                    component="span"
                    sx={{ marginLeft: 1 }}
                  >
                    男
                  </Typography>
                </Typography>
                <Typography>
                  学院:
                  <Typography
                    color="primary"
                    component="span"
                    sx={{ marginLeft: 1 }}
                  >
                    软件学院
                  </Typography>
                </Typography>
                <Typography>
                  专业:
                  <Typography
                    color="primary"
                    component="span"
                    sx={{ marginLeft: 1 }}
                  >
                    软件工程
                  </Typography>
                </Typography>
                <Typography>
                  兴趣爱好:
                  <Typography
                    color="primary"
                    component="span"
                    sx={{ marginLeft: 1 }}
                  >
                    看电影，玩游戏，听音乐，散步，拍照
                  </Typography>
                </Typography>
                <Typography>
                  博客:{" "}
                  <Link
                    href="https://wwwzzss.github.io/"
                    target="_blank"
                    sx={{ marginLeft: 1 }}
                  >
                    我的博客
                  </Link>
                </Typography>
                <Typography>
                  运动:{" "}
                  <Typography
                    color="primary"
                    component="span"
                    sx={{ marginLeft: 1 }}
                  >
                    乒乓球，跑步
                  </Typography>
                </Typography>
                <Typography>
                  gitee:{" "}
                  <Link
                    href="https://gitee.com/wzssqaq"
                    target="_blank"
                    sx={{ marginLeft: 1 }}
                  >
                    我的gitee
                  </Link>
                </Typography>
                <Typography>
                  github:{" "}
                  <Link
                    href="https://github.com/WWWZZSS"
                    target="_blank"
                    sx={{ marginLeft: 1 }}
                  >
                    我的github
                  </Link>
                </Typography>
                <Paper></Paper>
              </Box>
              <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
                {["导航目录"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      {anchor}
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} sm={12}>
            <Paper sx={{ width: "98%", height: 620, marginLeft: 1 }}>
              {open === 1 && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{
                      width: 900,
                      display: "flex",
                      justifyContent: "center",
                      mt: 10,
                    }}
                  >
                    <Masonry columns={4} spacing={6} sx={{ width: "100%" }}>
                      {/* {heights.map((height, index) => ( */}
                      {/* <div> */}
                      <Item key={1}>
                        {open1 === false ? (
                          <Box
                            key={1}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen1(!open1);
                            }}
                          >
                            <img
                              src={src[1]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={1}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "给时光以生命，给岁月以文明"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen1(!open1);
                                }}
                              >
                                <Typography sx={{ mt: -2 }}>
                                  科幻小说作家刘慈欣的《三体》系列小说，是我最喜欢的书。
                                </Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open2 === false ? (
                          <Box
                            key={2}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen2(!open2);
                            }}
                          >
                            <img
                              src={src[2]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={2}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "我可以不在这里，但总有一天，我们会无处可去的。"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen2(!open2);
                                }}
                              >
                                <Typography sx={{ mt: -2 }}>
                                  最喜欢的动漫是《罗小黑战记》
                                </Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open3 === false ? (
                          <Box
                            key={3}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen3(!open3);
                            }}
                          >
                            <img
                              src={src[3]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={3}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "更多的精彩，才刚刚开始"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen3(!open3);
                                }}
                              >
                                <Typography sx={{ mt: -2 }}>
                                  最喜欢的歌是易烊千玺的《精彩才刚刚开始》
                                </Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open4 === false ? (
                          <Box
                            key={4}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen4(!open4);
                            }}
                          >
                            <img
                              src={src[4]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={4}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "空山新雨后，天气晚来秋"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen4(!open4);
                                }}
                              >
                                比较喜欢下雨天，下雪天，秋天，冬天
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open5 === false ? (
                          <Box
                            key={5}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen5(!open5);
                            }}
                          >
                            <img
                              src={src[5]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={5}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "莫道桑榆晚，为霞尚满天"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen5(!open5);
                                }}
                              >
                                <Typography>
                                  《酬天乐咏老见示》刘禹锡
                                </Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open6 === false ? (
                          <Box
                            key={6}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen6(!open6);
                            }}
                          >
                            <img
                              src={src[6]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={6}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "希君生羽翼，一化北溟鱼"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen6(!open6);
                                }}
                              >
                                <Typography>
                                  《江夏使君叔席上赠史郎中》李白
                                </Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open7 === false ? (
                          <Box
                            key={7}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen7(!open7);
                            }}
                          >
                            <img
                              src={src[7]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={7}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "总有人间一两风，填我十万八千梦"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen7(!open7);
                                }}
                              >
                                <Typography>《续子不语》袁枚</Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                      <Item>
                        {open8 === false ? (
                          <Box
                            key={8}
                            sx={{ height: 200 }}
                            onClick={() => {
                              setOpen8(!open8);
                            }}
                          >
                            <img
                              src={src[8]}
                              alt=""
                              style={{
                                borderRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box key={8}>
                            <StyledAccordion sx={{ height: 200 }}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                  "曾经沧海难为水，除却巫山不是云"
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                onClick={() => {
                                  setOpen8(!open8);
                                }}
                              >
                                <Typography>《离思五首·其四》元稹</Typography>
                              </AccordionDetails>
                            </StyledAccordion>
                          </Box>
                        )}
                      </Item>
                    </Masonry>
                  </Box>
                </Box>
              )}
              {open === 2 && (
                <Box>
                  <Box
                    sx={{
                      height: 200,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="body2"
                  >
                    <Typography variant="h4" sx={{ color: "white" }}>
                      项目工作
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      sx={{
                        mt: 10,
                        width: "70%",
                        height: 140,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: 8,
                      }}
                    >
                      <Typography variant="body1" sx={{ width: "80%" }}>
                        在本小组5位同学一个学期的共同努力下，本次的课设项目圆满完成。在本次的项目中，我主要负责前端开发过程中，教师端的大部分业务。虽然在开发的过程中遇到了很多挫折和困难，但是很开心最后能圆满完成。在本次开发的过程中，我学到了很多与web相关的知识，同时也积累了很多开发的经验，受益匪浅。
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              )}
              {open === 3 && (
                <Box>
                  <Box
                    sx={{
                      height: 200,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="body3"
                  >
                    <Typography variant="h4" sx={{ color: "white" }}>
                      关于我
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      sx={{
                        mt: 10,
                        width: "70%",
                        height: 140,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: 8,
                      }}
                    >
                      <Typography variant="body1" sx={{ width: "80%" }}>
                        一个普通的大学生，努力学习代码技术ing。从21年暑假选这个专业开始，到现在一年多的时间，虽然代码水平不是特别高，但是也一点点学习了Java、html、c++、React、vue等语言，了解了算法和计算机的相关知识。虽然在编写代码的时候，往往我会因为一个bug而崩溃、苦恼，但是回过头看还是很开心能在一点点挫折中学习到更多。
                        希望在新的一年能利用好时间学到更多代码和技术，同时做更多自己喜欢的事。
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
