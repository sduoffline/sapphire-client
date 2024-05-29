import React, { useState } from "react";
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
} from "@mui/material";
import { useParams } from "react-router-dom";

import DownloadIcon from "@mui/icons-material/Download";
import ProgressTab from "./ProgressTab";
import PreviewTab from "./PreviewTab";
import AndroidIcon from "@mui/icons-material/Android";
import useSingleDataset from "../../queries/useSingleDataset";
import AddIcon from "@mui/icons-material/Add";
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

  const datasetId = useParams<{ id: string }>().id;

  const {
    data: dataset,
    isLoading,
    isError,
  } = useSingleDataset(Number(datasetId));

  return (
    <>
      {isError && <div>加载失败</div>}

      <Paper elevation={1} sx={{ p: 2, borderRadius: 4 }}>
        <Typography variant="h4">
          {isLoading ? <Skeleton /> : dataset?.dataSetName}
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
              {isLoading ? (
                <Skeleton variant="rectangular" />
              ) : (
                <img
                  src={dataset?.datas![0].imgUrl}
                  alt={dataset?.dataSetName}
                />
              )}
            </Box>
          </Container>
          <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              {isLoading ? <Skeleton variant="text" /> : dataset?.taskInfo}
            </Typography>
            {/* 一个撑开空间的div */}
            <div style={{ flexGrow: 1 }} />
            {/* 一些Chip作为标签的展示 */}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {dataset?.objects.map((tag) => (
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
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<AndroidIcon />}
              disabled={!dataset?.claim}
            >
              开始标注
            </Button>

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{ mt: 2 }}
              startIcon={<AddIcon />}
              disabled={dataset?.claim}
            >
              {dataset?.claim ? "已认领" : "认领"}
            </Button>
            <Button
              sx={{ mt: 2 }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<DownloadIcon />}
            >
              下载
            </Button>
          </Box>
        </Stack>
      </Paper>
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
        <Tab value="three" label="Issues" />
      </Tabs>
      <div>{value === "one" && <ProgressTab />}</div>
      <div>{value === "two" && <PreviewTab imgs={dataset?.datas} />}</div>
      <div>{value === "three" && <div>暂无Issues</div>}</div>
    </>
  );
}
