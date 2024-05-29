import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { DataSetProps } from "./helpers/Interface";
import { useNavigate } from "react-router-dom";

interface MyDataSetProps {
  dataset: DataSetProps;
}

export default function MyDataSet({ dataset }: MyDataSetProps) {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={2}
      sx={{ p: 2, borderRadius: 2, minWidth: 218, margin: 3 }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">{dataset.dataSetName}</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="text"
            onClick={() => {
              navigate(`/dataset/detail/${dataset.dataSetId}`);
            }}
          >
            查看
          </Button>
        </Stack>
        <Typography variant="caption">{dataset.taskInfo}</Typography>
        <div style={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <Typography variant="caption">截止时间:{dataset.schedule}</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button variant="contained">认领</Button>
          {/* <Typography variant="caption">已认领</Typography> */}
        </Stack>
      </Stack>
    </Paper>
  );
}
