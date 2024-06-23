import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { DataSetProps } from "./helpers/Interface";
import { useNavigate } from "react-router-dom";
import { claim_url } from "../constants/url";
import { useMutation } from "@tanstack/react-query";
import { postQueryFn } from "../queries/postQueryFn";
import Loading from "./loading";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

interface MyDataSetProps {
  dataset: DataSetProps;
}

export default function MyDataSet({ dataset }: MyDataSetProps) {
  const navigate = useNavigate();
  const {
    isPending: claimPending,
    isSuccess: claimSuccess,
    mutate: claimMutate,
  } = useMutation({
    mutationFn: postQueryFn,
  });
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (claimSuccess) {
      enqueueSnackbar("认领成功", { variant: "success" });
      navigate("/dataset/detail/" + dataset!.dataSetId);
    }
  }, [claimSuccess]);
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
        <Box sx={{ height: "50px", overflow: "hidden" }}>
          <Typography variant="caption">{dataset.taskInfo}</Typography>
        </Box>
        <div style={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <Typography variant="caption">
            截止时间:
            {dataset.schedule == null || dataset.schedule == ""
              ? "长期"
              : dataset.schedule}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {!dataset.claim && !dataset.owner && (
            <LoadingButton
              variant="contained"
              onClick={() => {
                claimMutate({
                  url: claim_url + "/" + dataset?.dataSetId,
                  params: {
                    creator_id: localStorage.getItem("userId"),
                  },
                  method: "POST",
                });
              }}
              loading={claimPending}
            >
              认领
            </LoadingButton>
          )}
          {dataset.owner && (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/dataset/update/" + dataset.dataSetId);
              }}
            >
              编辑
            </Button>
          )}
          {dataset.claim && (
            <Button
              variant="contained"
              onClick={() => {
                localStorage.setItem(
                  "workingDatasetId",
                  dataset!.dataSetId.toString()
                );
                navigate("/workdesk?datasetId=" + dataset!.dataSetId);
              }}
            >
              开工
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
