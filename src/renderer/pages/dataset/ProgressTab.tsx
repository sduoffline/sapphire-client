import { Box, LinearProgress, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';

import DayHeatmap from '../../components/DayHeatmap';

export default function ProgressTab() {
  return (
    <div>
      {/* 具体进度 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-space-between',
          alignItems: 'center',
          m: 2,
          gap: 2,
        }}
      >
        <Typography variant="h6">采集进度</Typography>
        <LinearProgress
          variant="determinate"
          value={80}
          sx={{ ml: 2, flexGrow: 1, marginRight: 4, height: 6 }}
        />
      </Box>

      {/* 日历热力图 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <DayHeatmap />
      </Box>

      {/* 时间线 */}
      <Typography variant="h6" sx={{ m: 2 }}>
        时间线
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        <TimelineItem>
          <TimelineOppositeContent>2024-04-10</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>进度达到80%</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>2024-04-10</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>进度达到60%</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>2024-04-10</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>进度达到30%</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>2024-04-10</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>创建数据集</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
