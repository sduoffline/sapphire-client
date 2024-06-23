import React from "react";
import { dataset, datasetList } from "../../constants/mockdata";
import MyDataSet from "../../components/MyDataSet";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  get_created_dataset_url,
  get_joined_dataset_url,
  running_dataset_url,
} from "../../constants/url";
import { queryFn } from "../../queries/queryFn";
import Loading from "../../components/loading";

export default function Datasets() {
  const [type, setType] = React.useState(0);

  const {
    data: joined_dataset,
    isSuccess: joined_Success,
    isError: joined_Error,
    isLoading: joined_Loading,
  } = useQuery({
    queryKey: [get_joined_dataset_url],
    queryFn: queryFn,
  });

  const {
    data: created_dataset,
    isSuccess: created_Success,
    isError: created_Error,
    isLoading: created_Loading,
  } = useQuery({
    queryKey: [get_created_dataset_url],
    queryFn: queryFn,
  });
  const {
    data: running_dataset,
    isSuccess: running_Success,
    isError: running_Error,
    isLoading: running_Loading,
  } = useQuery({
    queryKey: [running_dataset_url],
    queryFn: queryFn,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={type}
          onChange={(e, val: number) => setType(val)}
          aria-label="basic tabs example"
        >
          <Tab label="我认领的" id="0" />
          <Tab label="进行中的" id="1" />
          <Tab label="我发布的" id="2" />
        </Tabs>
      </Box>
      {type == 0 && joined_Success && (
        <Box sx={{ maxWidth: "1000px", width: "100%" }}>
          {joined_dataset.data.data.map((e: any) => {
            return <MyDataSet dataset={e} />;
          })}
        </Box>
      )}
      {type == 0 && joined_Loading && <Loading />}
      {type == 1 && running_Success && (
        <Box sx={{ maxWidth: "1000px", width: "100%" }}>
          {running_dataset.data.data.map((e: any) => {
            return <MyDataSet dataset={e} />;
          })}
        </Box>
      )}

      {type == 0 && joined_Loading && <Loading />}
      {type == 2 && created_Success && (
        <Box sx={{ maxWidth: "1000px", width: "100%" }}>
          {created_dataset.data.data.map((e: any) => {
            return <MyDataSet dataset={e} />;
          })}
        </Box>
      )}
    </Box>
  );
}
