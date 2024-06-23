import {
  Avatar,
  Button,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

// import LoadingButton from "../../components/LoadingButton";
import MyTextarea from "../../components/MyTextArea";
import ImgLoadingButton from "../../components/LoadingButton";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postQueryFn } from "../../queries/postQueryFn";
import {
  get_user_info,
  upd_user_info,
  upd_user_pwd,
  upload_img,
} from "../../constants/url";
import { queryFn } from "../../queries/queryFn";

const MyTitle = ({ value }: { value: any }) => {
  return (
    <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
      {value}
    </Typography>
  );
};
const fileoptions = {
  maxSizeMB: 1,
  useWebWorker: true,
};
export default function Setting() {
  const [proInfo, setProInfo] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [file, setFile] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState({ old: "", new: "" });

  const {
    mutate: imgMutate,
    isSuccess: imgSuccess,
    data: imgData,
    isPending: imgPending,
  } = useMutation({ mutationFn: postQueryFn });

  const {
    mutate: infoMutate,
    isSuccess: infoSuccess,
    data: infoData,
    isPending: infoPending,
  } = useMutation({ mutationFn: postQueryFn });
  const {
    mutate: pwdMutate,
    isSuccess: pwdSuccess,
    data: pwdData,
    isPending: pwdPending,
    isError: pwdError,
    error: pwdErrorMsg,
  } = useMutation({ mutationFn: postQueryFn });

  const {
    data: _info,
    isSuccess: _infoSuccess,
    isLoading: _infoLoading,
  } = useQuery({
    queryKey: [get_user_info + "/" + localStorage.getItem("userId")],
    queryFn: queryFn,
  });

  useEffect(() => {
    if (pwdSuccess) {
      enqueueSnackbar("密码更新成功，请重新登录", { variant: "success" });
      navigate("/");
    }
  }, [pwdSuccess]);
  useEffect(() => {
    if (pwdError) {
      // console.log(pwdErrorMsg?.response.data.message);
      enqueueSnackbar("原密码错误", { variant: "error" });
    }
  }, [pwdError]);
  useEffect(() => {
    if (infoSuccess) {
      enqueueSnackbar("个人信息更新成功", { variant: "success" });
    }
  }, [infoSuccess]);

  useEffect(() => {
    if (_infoSuccess) {
      setProInfo(_info.data.data);
    }
  }, [_infoSuccess]);

  useEffect(() => {
    if (imgSuccess) {
      // setProInfo({ ...proInfo, avatar: imgData.data.url });
      //上传新图片url
      infoMutate({
        url: upd_user_info,
        method: "post",
        data: { avatar: imgData.data.url },
      });
    }
  }, [imgSuccess]);

  const uploadIt = (e: any) => {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
    const path = window.URL.createObjectURL(e.target.files[0]);
    setAvatar(path);
  };
  const handleChose = () => {
    var evt = new MouseEvent("click", {
      bubbles: false,
      cancelable: true,
      view: window,
    });
    var inputNode = document.getElementById("trueupload");
    inputNode?.dispatchEvent(evt);
  };
  const handleUpload = async () => {
    console.log("开始上传");
    if (document.getElementById("trueupload").files[0])
      setFile(document.getElementById("trueupload").files[0]);
    let nowfile;
    if (file) nowfile = file;
    else nowfile = document.getElementById("trueupload")?.files[0];
    if (!nowfile) {
      enqueueSnackbar("请选择图片", { variant: "error" });
      return;
    }

    var ext = nowfile.name.split(".")[1];
    var compressedFile;
    // setAvatarFetching(true);
    if (ext != "gif") {
      compressedFile = await imageCompression(nowfile, fileoptions);
    } else compressedFile = nowfile;
    let param = new FormData();
    param.append("file", compressedFile);
    imgMutate({
      url: upload_img,
      headers: { "Content-Type": "multipart/form-data;" },
      method: "post",
      data: param,
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ display: "flex" }}>
            <Box sx={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
              <Typography variant="h5">个人设置</Typography>
              <Box sx={{ marginLeft: 5 }}>
                <MyTitle value="用户名" />
                <TextField
                  size="small"
                  id="outlined-required"
                  label="Name"
                  value={proInfo.name}
                  onChange={(e) => {
                    setProInfo({ ...proInfo, name: e.target.value });
                  }}
                />
                {/* {proInfo.name} */}
                <MyTitle value="邮箱" />
                <TextField
                  disabled
                  size="small"
                  id="outlined-required"
                  label="email"
                  value={proInfo.email}
                />
                <MyTitle value="个性签名" />
                <MyTextarea
                  placeholder="介绍一下你自己叭..."
                  value={proInfo.description}
                  change={(e: any) => {
                    setProInfo({ ...proInfo, description: e });
                  }}
                />
              </Box>
              {/* {proInfo.name} */}

              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <LoadingButton
                  variant="contained"
                  loading={infoPending}
                  onClick={() => {
                    infoMutate({
                      url: upd_user_info,
                      method: "post",
                      data: proInfo,
                    });
                  }}
                >
                  更新信息
                </LoadingButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ paddingTop: 6 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ maxWidth: "170px", width: "80%" }}>
                <Avatar
                  alt={proInfo.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1/1",
                  }}
                  src={avatar}
                ></Avatar>
                <form id="uploadForm">
                  <input
                    name="avatar"
                    type="file"
                    id="trueupload"
                    style={{ display: "none" }}
                    onChange={uploadIt}
                    accept="image/png,image/gif,image/jpeg"
                  ></input>
                </form>
              </Box>
              <Box sx={{ marginTop: 2, marginBottom: 3 }}>
                <ImgLoadingButton
                  titlel="保存"
                  showLeft={true}
                  titler={imgSuccess && infoSuccess ? "上传成功" : "选择图片"}
                  clickl={handleUpload}
                  clickr={handleChose}
                  isFetching={imgPending || infoPending}
                  isSuccess={imgSuccess && infoSuccess}
                  litleTitle="可以上传动图哦"
                />
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ marginTop: "50px", padding: "20px" }}>
            <Box>
              <Typography variant="h5">修改密码</Typography>
            </Box>
            <Box sx={{ marginLeft: 8, marginTop: 3 }}>
              <MyTitle value="原密码"></MyTitle>
              <TextField
                label="old password"
                type="password"
                size="small"
                onChange={(e) => {
                  setPwd({ ...pwd, old: e.target.value });
                }}
                value={pwd.old}
              />
              <MyTitle value="新密码"></MyTitle>
              <TextField
                label="new password"
                type="password"
                size="small"
                value={pwd.new}
                onChange={(e) => {
                  setPwd({ ...pwd, new: e.target.value });
                }}
              />
            </Box>
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <LoadingButton
                loading={pwdPending}
                variant="contained"
                onClick={() => {
                  pwdMutate({
                    url: upd_user_pwd,
                    method: "post",
                    data: pwd,
                  });
                }}
                // titler={pwdSuccess ? "保存成功" : "保存"}
                // clickr={handleUploadPwd}
                // isFetching={pwdIsLoading}
                // isSuccess={pwdSuccess}
              >
                更新密码
              </LoadingButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
