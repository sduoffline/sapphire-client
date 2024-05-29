import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { DataSetProps } from "./helpers/Interface";

interface MyDataSetProps {
  dataset: DataSetProps;
}

export default function DataSet({ dataset }: MyDataSetProps) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, minWidth: 218, margin: 1 }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">{dataset.dataSetName}</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button variant="text">查看</Button>
        </Stack>
        <Typography variant="caption">{dataset.taskInfo}</Typography>
        <div style={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <Typography variant="caption">截止时间:{dataset.schedule}</Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="caption">
            {dataset.finished + "/" + dataset.total}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
