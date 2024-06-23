import { Stack, Typography, Divider, Avatar, Grid } from "@mui/material";
import OngoingTaskPanal from "./OngoingTaskPanal";
import NewsPanel from "./NewsPanel";
import SkillPanel from "./SkillPanel";
import NotificationPanel from "./NotificationPanel";
import { useQuery } from "@tanstack/react-query";
import { running_dataset_url } from "../../constants/url";
import { queryFn } from "../../queries/queryFn";

function HeaderInfoItem({ title, value }: { title: string; value: string }) {
  return (
    <Stack direction="column" spacing={1} alignItems="end">
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  );
}

export default function ConsoleBoard() {
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
    <>
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="Sapphire"
          src="https://cloud.icooper.cc/apps/sharingpath/PicSvr/PicMain/Sapphire_transparentbg.png"
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="h6">
          早安, {localStorage.getItem("name")}, 又是标数据的一天
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <HeaderInfoItem
          title="任务"
          value={running_dataset?.data.data.length}
        />
        <HeaderInfoItem title="访问次数" value="30" />
      </Stack>
      <div style={{ height: 8 }} />
      <Divider />
      <div style={{ height: 8 }} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <OngoingTaskPanal />
          <div style={{ height: 24 }} />
          <NewsPanel />
        </Grid>
        <Grid item xs={4}>
          <SkillPanel />
          <div style={{ height: 24 }} />
          <NotificationPanel />
        </Grid>
      </Grid>
      <div style={{ height: 24 }} />
    </>
  );
}
