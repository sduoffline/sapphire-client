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
import { useNavigate } from "react-router-dom";

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

function NewsItem() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="body1">Sapphire 完成了任务集-抓马</Typography>
        <div style={{ flexGrow: 1 }} />
        {/* <Button variant="text">查看</Button> */}
      </Stack>
    </Box>
  );
}

export default function NewsPanel() {
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">动态</Typography>
          <div style={{ flexGrow: 1 }} />
          {/* <Button
            variant="outlined"
            sx={{
              borderRadius: "14px",
              "&:hover": {
                shadow: "none",
              },
            }}
          >
            查看全部
          </Button> */}
        </Stack>
        <div style={{ height: 8 }} />
        <Divider />
        <div style={{ height: 8 }} />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {itemData.map((item) => (
            <ListItem key={item.name}>
              <NewsItem />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
