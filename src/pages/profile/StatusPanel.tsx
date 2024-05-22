import { Stack, Typography } from '@mui/material';

function StatusItem({ title, value }: { title: string; value: string }) {
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Typography variant="caption">{title}</Typography>
      <Typography
        variant="h5"
        sx={{
          // 鼠标悬停时放大
          '&:hover': {
            transform: 'scale(1.1)',
            transition: 'all 0.2s',
          },
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

export default function StatusPanel() {
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-around' }}
      >
        <StatusItem title="积分" value="100" />
        <StatusItem title="参与数量" value="12" />
        <StatusItem title="标注数量" value="30" />
        <StatusItem title="连续打卡" value="3" />
      </Stack>
    </div>
  );
}
