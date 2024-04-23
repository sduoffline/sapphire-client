import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Stack,
  Container,
  Chip,
  Tabs,
  Tab,
  Box,
} from '@mui/material';

import ProgressTab from './ProgressTab';
import PreviewTab from './PreviewTab';

const tagData = ['标签1', '标签2', '标签3', '标签4', '标签5'];

export default function DatasetDetail() {
  const [value, setValue] = useState('one');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper elevation={1} sx={{ p: 2, borderRadius: 4 }}>
        <Typography variant="h4">数据集详情</Typography>
        <Stack
          spacing={2}
          sx={{ mt: 2 }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          {/* 限制大小 */}
          <Container sx={{ width: { xs: '100%', sm: '30%' } }}>
            {/* 封面图，包一层圆角 */}
            <Box sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                alt="dataset"
                style={{ width: '100%' }}
              />
            </Box>
          </Container>
          <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              数据集描述，这一段是数据集的描述，会比较长长长长长。
            </Typography>
            {/* 一个撑开空间的div */}
            <div style={{ flexGrow: 1 }} />
            {/* 一些Chip作为标签的展示 */}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {tagData.map((tag) => (
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
      <div>{value === 'one' && <ProgressTab />}</div>
      <div>{value === 'two' && <PreviewTab />}</div>
    </div>
  );
}
