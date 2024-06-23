import { Box, LinearProgress, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import DayHeatmap from "../../components/DayHeatMap";
import { DataSetProps } from "../../components/helpers/Interface";
import { useEffect } from "react";

export default function ProgressTab(props: any) {
  const { dataset } = props;
  useEffect(() => {
    console.log(dataset);
  }, []);
  return (
    <div>
      {/* 具体进度 */}

      <Typography variant="h6" sx={{ m: 2 }}>
        采集进度
      </Typography>
      <LinearProgress
        variant="determinate"
        value={
          dataset.totalCount
            ? (dataset.annotationCount / dataset.totalCount) * 100
            : 0
        }
        sx={{ ml: 2, flexGrow: 1, marginRight: 4, height: 6 }}
      />

      {/* 日历热力图 */}
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <DayHeatmap type="task" id={dataset?.dataSetId} />
      </Box>

      {/* 时间线 */}
      <Typography variant="h6" sx={{ m: 2 }}>
        embedding计算进度
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {/* <TimelineItem>
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
        </TimelineItem> */}
        {dataset.embeddingCount < dataset.totalCount && (
          <TimelineItem>
            {/* <TimelineOppositeContent>2024-04-10</TimelineOppositeContent> */}
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>持续计算中</TimelineContent>
          </TimelineItem>
        )}
        {dataset.embeddingCount == dataset.totalCount && (
          <TimelineItem>
            {/* <TimelineOppositeContent>2024-04-10</TimelineOppositeContent> */}
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              计算完成，共{dataset.totalCount}张数据
            </TimelineContent>
          </TimelineItem>
        )}
        {dataset.embeddingCount / dataset.totalCount >= 0.9 && (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>进度达到90%</TimelineContent>
          </TimelineItem>
        )}
        {dataset.embeddingCount / dataset.totalCount >= 0.6 && (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>进度达到60%</TimelineContent>
          </TimelineItem>
        )}
        {dataset.embeddingCount / dataset.totalCount >= 0.3 && (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>进度达到30%</TimelineContent>
          </TimelineItem>
        )}

        <TimelineItem>
          {/* <TimelineOppositeContent>2024-04-10</TimelineOppositeContent> */}
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>创建数据集</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
