import React from 'react';
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
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
export default function HistoryInfoPanel() {
  return (
    <div>
      <Paper sx={{ padding: 2, borderRadius: 2 }}>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 1,
          }}
        >
          <Typography variant="h6">历史记录</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button variant="text">查看更多</Button>
        </Container>
        <Divider />
        <div style={{ height: 8 }} />
        <List>
          {Array.from({ length: 3 }, (_, idx) => HistoryItem(idx + 1))}
        </List>
      </Paper>
    </div>
  );
}
