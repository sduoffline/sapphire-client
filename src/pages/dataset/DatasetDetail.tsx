import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Stack,
  Container,
  Chip,
  Tabs,
  Tab,
  Box,
  Skeleton,
  Button,
  Tooltip,
  Grid,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import DownloadIcon from "@mui/icons-material/Download";
import ProgressTab from "./ProgressTab";
import PreviewTab from "./PreviewTab";
import AndroidIcon from "@mui/icons-material/Android";
import BackupIcon from "@mui/icons-material/Backup";
import useSingleDataset from "../../queries/useSingleDataset";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryFn } from "../../queries/queryFn";
import {
  base_url,
  claim_url,
  dataset_detail_url,
  dataset_joined_users,
} from "../../constants/url";
import { DataSetProps } from "../../components/helpers/Interface";
import { postQueryFn } from "../../queries/postQueryFn";
import { useSnackbar } from "notistack";
import Loading from "../../components/loading";
import UploadIcon from "@mui/icons-material/Upload";
// const data = {
//   dataSetId: 1, //数据集id
//   dataSetName: "抓马", //数据集名称
//   taskInfo: "区分颜色标出图中的所有马",
//   objectCnt: 3, //目标种类数量
//   objects: ["白马", "黑马", "棕马"], //目标种类列表
//   schedule: "10/40",

//   datas: [
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/GettyImages-1207721867.jpg",
//       embeddingUrl:
//         window.location.origin +
//         "/assets/gallery/GettyImages-1207721867.jpg.txt",
//       id: 1,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//     {
//       imgUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
//       embeddingUrl:
//         window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
//       id: 2,
//     },
//   ],
// };

export default function DatasetDetail() {
  const [value, setValue] = useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [claim, setClaim] = useState(false);

  const { id } = useParams();

  const { isSuccess, data, isFetching, isError, error } = useQuery({
    queryKey: [
      dataset_detail_url + "/" + id,
      // { params: { user_id: localStorage.getItem("userId") } },
    ],
    queryFn: queryFn,
  });

  const {
    isSuccess: usersSuccess,
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: [dataset_joined_users + "/" + id],
    queryFn: queryFn,
  });

  const [dataset, setDataset] = useState<DataSetProps>();
  useEffect(() => {
    if (isSuccess) {
      setDataset(data.data.data);
      setClaim(data.data.data.claim);
    }
  }, [isSuccess]);

  const {
    isPending: claimPending,
    isSuccess: claimSuccess,
    mutate: claimMutate,
  } = useMutation({
    mutationFn: postQueryFn,
  });
  const handleClaim = () => {
    setClaim(true);
    claimMutate({
      url: claim_url + "/" + dataset?.dataSetId,
      params: {
        creator_id: localStorage.getItem("userId"),
      },
      method: "POST",
    });
  };
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      // formData.append("dataset_id", dataset?.dataSetId.toString() || "");

      fetch(base_url + "dataset/upload/" + id, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token") + "",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          enqueueSnackbar("上传成功", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("上传失败", { variant: "error" });
        });
    }
  };

  return (
    <>
      {isError && <div>加载失败</div>}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Paper elevation={1} sx={{ width: "80%", p: 2, borderRadius: 4 }}>
          <Typography variant="h4">
            {isFetching && <Skeleton />}
            {isSuccess && dataset?.dataSetName}
          </Typography>
          <Stack
            spacing={2}
            sx={{ mt: 2 }}
            direction={{ xs: "column", sm: "row" }}
          >
            {/* 限制大小 */}
            <Container sx={{ width: { xs: "100%", sm: "30%" } }}>
              {/* 封面图，包一层圆角 */}
              <Box
                width={{ xs: "100%", sm: 200 }}
                height={200}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  // 悬浮效果
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                    transition: "all 0.2s",
                  },
                }}
              >
                {isFetching ? (
                  <Skeleton variant="rectangular" />
                ) : (
                  <img
                    src={
                      dataset?.datas && dataset.datas.length > 0
                        ? dataset?.datas![0]?.imgUrl
                        : "/logo512.png"
                    }
                    alt={dataset?.dataSetName}
                  />
                )}
              </Box>
            </Container>
            <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
              <Typography variant="body1">
                {isFetching ? <Skeleton variant="text" /> : dataset?.taskInfo}
              </Typography>
              {/* 一个撑开空间的div */}
              <div style={{ flexGrow: 1 }} />
              {/* 一些Chip作为标签的展示 */}
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {dataset?.objects?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                    onClick={() => {}}
                    color="secondary"
                  />
                ))}
              </Stack>
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="必须先认领才可标注">
                <Box>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<AndroidIcon />}
                    disabled={!claim && !dataset?.owner}
                    onClick={() => {
                      localStorage.setItem(
                        "workingDatasetId",
                        dataset!.dataSetId.toString()
                      );
                      navigate("/workdesk?datasetId=" + dataset!.dataSetId);
                    }}
                  >
                    开始标注
                  </Button>
                </Box>
              </Tooltip>

              {!dataset?.owner && (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  sx={{ mt: 2 }}
                  startIcon={<AddIcon />}
                  disabled={claim}
                  onClick={handleClaim}
                >
                  {claim ? "已认领" : "认领"}
                </Button>
              )}
              {dataset?.owner && (
                <>
                  <Button
                    sx={{ mt: 2 }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<DownloadIcon />}
                  >
                    下载结果
                  </Button>
                  <Button
                    sx={{ mt: 2 }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UploadIcon />}
                  >
                    上传数据
                    <input
                      type="file"
                      accept=".zip"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </>
              )}
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ height: 280, padding: 3, width: "20%", mt: 1, ml: 3 }}>
          <Typography variant="h5">参与者</Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
          {usersLoading && <Loading />}
          {usersSuccess && (
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {users.data?.data?.map((e: any) => (
                <Tooltip title={e.name}>
                  <IconButton
                    sx={{ mr: 1 }}
                    onClick={() => {
                      navigate("/profile?id=" + e.ID);
                    }}
                  >
                    <Avatar src={e.avatar} alt={e.name} />
                  </IconButton>
                </Tooltip>
              ))}
              {users?.data.data == null && <Typography>暂无参与者</Typography>}
            </Box>
          )}
        </Paper>
      </Box>

      {/* 一个拉开距离的div */}
      <div style={{ height: 20 }} />
      {/* 一个Tabs组件 */}
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="进度" />
        <Tab value="two" label="数据预览" />
        <Tab value="three" label="讨论" />
      </Tabs>
      {isSuccess && (
        <>
          <div>
            {value === "one" && <ProgressTab dataset={data.data.data} />}
          </div>
          <div>{value === "two" && <PreviewTab imgs={dataset?.datas} />}</div>
          <div>
            {value === "two" && dataset?.datas?.length == 0 && (
              <div>暂无数据</div>
            )}
          </div>
          <div>{value === "three" && <div>暂无Issues</div>}</div>
        </>
      )}
    </>
  );
}
