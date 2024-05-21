import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

export default function SkillPanel() {
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">技能面板</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            sx={{
              borderRadius: '14px',
              '&:hover': {
                shadow: 'none',
              },
            }}
          >
            更多
          </Button>
        </Stack>
        <div style={{ height: 8 }} />
        <Divider />
        <div style={{ height: 8 }} />
      </Box>
    </Paper>
  );
}
