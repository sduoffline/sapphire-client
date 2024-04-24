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
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import ProgressTab from './ProgressTab';
import PreviewTab from './PreviewTab';

import useSingleDataset from '../../queries/useSingleDataset';

const tagData = ['标签1', '标签2', '标签3', '标签4', '标签5'];

export default function DatasetDetail() {
  const [value, setValue] = useState('one');
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
          {isLoading ? <Skeleton /> : dataset?.name}
        </Typography>
        <Stack
          spacing={2}
          sx={{ mt: 2 }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          {/* 限制大小 */}
          <Container sx={{ width: { xs: '100%', sm: '30%' } }}>
            {/* 封面图，包一层圆角 */}
            <Box
              width={{ xs: '100%', sm: 200 }}
              height={200}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                // 悬浮效果
                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s',
                },
              }}
            >
              {isLoading ? (
                <Skeleton variant="rectangular" />
              ) : (
                <img src={dataset?.img} alt={dataset?.name} />
              )}
            </Box>
          </Container>
          <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              {isLoading ? <Skeleton variant="text" /> : dataset?.description}
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
      <div>{value === 'three' && <div>暂无Issues</div>}</div>
    </>
  );
}
