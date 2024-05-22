import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

export default function NotificationPanel() {
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">通知</Typography>
          <div style={{ flexGrow: 1 }} />
        </Stack>
        <div style={{ height: 8 }} />
        <Divider />
        <div style={{ height: 8 }} />
      </Box>
    </Paper>
  );
}
