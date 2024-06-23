import { Stack, Typography } from "@mui/material";

function StatusItem({ title, value }: { title: string; value: string }) {
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Typography variant="caption">{title}</Typography>
      <Typography
        variant="h5"
        sx={{
          // 鼠标悬停时放大
          "&:hover": {
            transform: "scale(1.1)",
            transition: "all 0.2s",
          },
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

export default function StatusPanel({ dataset }: { dataset: any }) {
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-around" }}
      >
        <StatusItem title="积分" value={dataset?.score} />
        <StatusItem title="参与数量" value={dataset?.joinedCount} />
        <StatusItem title="标注数量" value={dataset?.annotatedCount} />
        <StatusItem title="创建数量" value={dataset?.createdCount} />
      </Stack>
    </div>
  );
}
