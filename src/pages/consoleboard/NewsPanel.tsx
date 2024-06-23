import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryFn } from "../../queries/queryFn";
import { message_url } from "../../constants/url";

const itemData = [
  {
    name: "数据集1",
  },
  {
    name: "数据集2",
  },
  {
    name: "数据集3",
  },
];

function NewsItem({ msg }: { msg: string }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="body1">{msg}</Typography>
        <div style={{ flexGrow: 1 }} />
        {/* <Button variant="text">查看</Button> */}
      </Stack>
    </Box>
  );
}

export default function NewsPanel() {
  const { isSuccess, isError, data } = useQuery({
    queryKey: [message_url],
    queryFn: queryFn,
  });
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">动态</Typography>
          <div style={{ flexGrow: 1 }} />
        </Stack>
        <div style={{ height: 8 }} />
        <Divider />
        <div style={{ height: 8 }} />
        {isSuccess && (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {data.data.data.map((item: any) => {
              return (
                item.Type == 1 && (
                  <ListItem key={item.Content}>
                    <NewsItem msg={item.Content} />
                  </ListItem>
                )
              );
            })}
          </List>
        )}
      </Box>
    </Paper>
  );
}
