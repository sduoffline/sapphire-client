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

export default function Datasets() {
  const [type, setType] = React.useState(0);
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
      <Box sx={{ maxWidth: "1000px", width: "100%" }}>
        {datasetList.map((e) => {
          return <MyDataSet dataset={e} />;
        })}
      </Box>
    </Box>
  );
}
