import { Stack, Typography, Divider, Avatar, Grid } from '@mui/material';
import OngoingTaskPanal from './OngoingTaskPanal';
import NewsPanel from './NewsPanel';
import SkillPanel from './SkillPanel';
import NotificationPanel from './NotificationPanel';

function HeaderInfoItem({ title, value }: { title: string; value: string }) {
  return (
    <Stack direction="column" spacing={1} alignItems="end">
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  );
}

export default function Workbench() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="Sapphire"
          src="https://cloud.icooper.cc/apps/sharingpath/PicSvr/PicMain/Sapphire_transparentbg.png"
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="h6">早安, Sapphire, 又是标数据的一天</Typography>
        <div style={{ flexGrow: 1 }} />
        <HeaderInfoItem title="任务" value="10" />
        <HeaderInfoItem title="团队内排名" value="3/10" />
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
