import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import DataSet from "../../components/DataSet";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { running_dataset_url } from "../../constants/url";
import { queryFn } from "../../queries/queryFn";
import Loading from "../../components/loading";

const mockData = [
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
];

// function TaskItem() {
//   return (
//     <Paper sx={{ p: 2, borderRadius: 2, minWidth: 218 }}>
//       <Stack direction="column" spacing={2}>
//         <Stack direction="row" spacing={2}>
//           <Typography variant="h6">任务名称</Typography>
//           <div style={{ flexGrow: 1 }} />
//           <Button variant="text">查看</Button>
//         </Stack>
//         <Typography variant="caption">任务描述</Typography>
//         <div style={{ flexGrow: 1 }} />
//         <Stack direction="row" spacing={2}>
//           <Typography variant="caption">截止时间</Typography>
//           <div style={{ flexGrow: 1 }} />
//           <Typography variant="caption">任务状态</Typography>
//         </Stack>
//       </Stack>
//     </Paper>
//   );
// }

export default function OngoingTaskPanal() {
  const navigate = useNavigate();
  const {
    data: running_dataset,
    isSuccess: running_Success,
    isError: running_Error,
    isLoading: running_Loading,
  } = useQuery({
    queryKey: [running_dataset_url],
    queryFn: queryFn,
  });

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">进行中的任务</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            sx={{
              borderRadius: "14px",
              "&:hover": {
                shadow: "none",
              },
            }}
            onClick={() => {
              navigate("/datasets");
            }}
          >
            查看全部
          </Button>
        </Stack>
        <div style={{ height: 8 }} />
        <Divider />
        <div style={{ height: 8 }} />
        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2 }}
          useFlexGap
          flexWrap="wrap"
          justifyContent="space-around"
        >
          {running_Success &&
            running_dataset.data.data.slice(0, 3).map((item: any) => (
              <Box sx={{ width: "30%" }}>
                <DataSet dataset={item} />
              </Box>
            ))}
          {running_Loading && <Loading />}
        </Stack>
      </Box>
    </Paper>
  );
}
