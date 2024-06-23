import React, { useContext, useEffect, useState } from "react";

import "./login.css";
import { useSnackbar } from "notistack";
import getLocalUser from "../../api/getUser";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
// import VerPng from "../../components/VerPng";
// import useVrLogin from "../../query/useVrLogin";
import { useNavigate } from "react-router-dom";
// import useReset from "../../query/useReset";
import { ThemeProvider } from "@emotion/react";
import { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import { postQueryFn } from "../../queries/postQueryFn";
import { login_url, signUP_url } from "../../constants/url";
export default function Login() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [theName, setTheName] = useState(1);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPsw, setLoginUserPsw] = useState("");
  const localUser = getLocalUser();
  const { enqueueSnackbar } = useSnackbar();
  const [vertifyCode, setVertifyCode] = useState("");
  const [verToken, setVerToken] = useState();
  const [lgType, setLgtype] = useState(false);
  const [changeVr, setChangeVr] = useState(false);
  const [email, setEmail] = useState("");
  const changeVrCode = (e) => {
    setVertifyCode(e.target.value);
  };
  const changeClass = () => {
    setLgtype(!lgType);
    if (theName === 0) setTheName(1);
    else setTheName(0);
  };
  const changeLgName = (e) => {
    setLoginUserName(e.target.value);
  };
  const changeLgPsw = (e) => {
    setLoginUserPsw(e.target.value);
  };

  const {
    isPending: loginPending,
    isSuccess: loginSuccess,
    isError: loginIsError,
    data: loginData,
    mutate: loginMutate,
    error: loginError,
  } = useMutation({
    mutationFn: postQueryFn,
  });
  const {
    isPending: signUpPending,
    isSuccess: signUpSuccess,
    isError: signUpIsError,
    data: signUpData,
    mutate: signUpMutate,
    error: signUpError,
  } = useMutation({
    mutationFn: postQueryFn,
  });
  const Login = () => {
    //实现登录接口
    if (loginUserName === "" || loginUserPsw === "") {
      enqueueSnackbar("账号密码不能为空", { variant: "warning" });
      return;
    }
    loginMutate({
      url: login_url,
      method: "post",
      data: {
        name: loginUserName,
        passwd: loginUserPsw,
      },
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/workshop");
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      if (loginData.data.code !== 200) {
        enqueueSnackbar(loginData.data.msg, { variant: "error" });
        return;
      } else {
        console.log(loginData.data);
        localStorage.setItem("token", "Bearer " + loginData.data.data.token);
        localStorage.setItem("name", loginUserName);
        localStorage.setItem("userId", loginData.data.data.user.ID);
        localStorage.setItem("avatar", loginData.data.data.user.avatar);
        navigate("/workshop");
      }
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (loginIsError) {
      console.log(loginError.response.data.message);
      enqueueSnackbar(loginError.response.data.message, { variant: "error" });
    }
  }, [loginIsError]);

  // const {mutate} = useMutation({})

  const handleReset = () => {
    if (vertifyCode == "") {
      enqueueSnackbar("请填写密码", { variant: "warning" });
      return;
    }
    if (email == "") {
      enqueueSnackbar("邮箱不能为空", { variant: "warning" });
      return;
    }
    if (loginUserName == "") {
      enqueueSnackbar("用户名不能为空", { variant: "warning" });
      return;
    }

    signUpMutate({
      url: signUP_url,
      data: {
        name: loginUserName,
        passwd: vertifyCode,
        email: email,
        avatar: "http://t",
      },
      method: "post",
    });
  };

  useEffect(() => {
    if (signUpSuccess) {
      enqueueSnackbar("注册成功,请登录", { variant: "success" });
      changeClass();
    }
  }, [signUpSuccess]);

  const innerTheme = useMemo(() =>
    createTheme({
      palette: {
        mode: "light",
      },
    })
  );
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={innerTheme}>
      <div className="mybody">
        <div
          className={
            theName === 0 ? "container right-panel-active" : "container"
          }
        >
          <div className="test">
            <div className="container__form container--signup">
              <div className="form" id="form1">
                <h2 className="form__title">注册用户</h2>
                <TextField
                  size="small"
                  label="用户名"
                  value={loginUserName}
                  onChange={(e) => {
                    setLoginUserName(e.target.value);
                  }}
                  type="text"
                  // placeholder="学号"
                  className="input"
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  size="small"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  label="邮箱"
                  type="email"
                  className="input"
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  value={vertifyCode}
                  onChange={changeVrCode}
                  size="small"
                  label="密码"
                  type="password"
                  className="input"
                />

                <Button
                  sx={{ width: 120 }}
                  variant="contained"
                  onClick={handleReset}
                >
                  注册
                </Button>
              </div>
            </div>

            <div className="container__form container--signin">
              <div className="form" id="form2">
                <h2 className="form__title">登录</h2>
                <TextField
                  label="用户名"
                  type="text"
                  size="small"
                  onChange={changeLgName}
                  // placeholder="学号"
                  value={loginUserName}
                  className="input"
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  size="small"
                  type="password"
                  label="密码"
                  value={loginUserPsw}
                  onChange={changeLgPsw}
                  className="input"
                />
                {/* <TextField
                  sx={{ marginTop: 2 }}
                  value={vertifyCode}
                  onChange={changeVrCode}
                  size="small"
                  label="验证码"
                  type="email"
                  className="input"
                /> */}
                {/* <img src={imgUrl} style={{ width: 100 }}></img> */}

                <Button sx={{ width: 120 }} variant="contained" onClick={Login}>
                  登录
                </Button>
              </div>
            </div>
            <div className="container__overlay">
              <div className="overlay">
                <div className="overlay__panel overlay--left">
                  <button className="btn" id="signIn" onClick={changeClass}>
                    登录
                  </button>
                </div>
                <div className="overlay__panel overlay--right">
                  <button className="btn" id="signUp" onClick={changeClass}>
                    注册
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
