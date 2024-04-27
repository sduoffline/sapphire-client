import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';

interface SettingProps {
  title: string;
  description: string;
}

function SettingItem({ title, description }: SettingProps) {
  return (
    <div>
      <Stack direction="column" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="caption">{description}</Typography>
      </Stack>
    </div>
  );
}
interface SettingGroupProps {
  title: string;
  children: React.ReactNode;
}

function SettingGroup({ title, children }: SettingGroupProps) {
  return (
    <Grid item xs={6}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Paper sx={{ p: 2, borderRadius: 2 }}>{children}</Paper>
    </Grid>
  );
}

export default function Setting() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">设置</Typography>
      </Grid>
      <SettingGroup title="账户设置">
        <SettingItem title="用户名" description="用户名" />
        <SettingItem title="密码" description="密码" />
      </SettingGroup>
    </Grid>
  );
}
