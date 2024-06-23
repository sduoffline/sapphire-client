import React from "react";
import {
  Divider,
  List,
  Container,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useQuery } from "@tanstack/react-query";
import { get_joined_dataset_url } from "../../constants/url";
import { queryFn } from "../../queries/queryFn";
import MyDataSet from "../../components/MyDataSet";

function HistoryItem(idx: number) {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={`任务${idx}`} secondary="2021-09-01" />
      </ListItemButton>
    </ListItem>
  );
}
export default function HistoryInfoPanel(props: any) {
  const { id } = props;
  const { isSuccess, isLoading, isError, data } = useQuery({
    queryKey: [
      get_joined_dataset_url,
      {
        headers: {
          "Sapphire-User-ID": id,
          Authorization: localStorage.getItem("token"),
        },
      },
    ],
    queryFn: queryFn,
  });

  return (
    <div>
      <Paper sx={{ padding: 2, borderRadius: 2 }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <Typography variant="h6">加入的数据集</Typography>
          <div style={{ flexGrow: 1 }} />
          {/* <Button variant="text">查看更多</Button> */}
        </Container>
        <Divider />
        <div style={{ height: 8 }} />
        {/* <List> */}

        {/* {Array.from({ length: 3 }, (_, idx) => HistoryItem(idx + 1))} */}
        {/* </List> */}
        {isSuccess &&
          data?.data.data.map((e: any) => {
            return <MyDataSet dataset={e} />;
          })}
      </Paper>
    </div>
  );
}
