import React, { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Box,
  Divider,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import TitlebarImageList from "./DetailList";
import LeaderBoard from "./LeaderBoard";
import CreateDataset from "../dataset/CreateDataset";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 512,
  boxShadow: 24,
};

function Workshop() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateClick = () => {
    setModalOpen(true);
  };
  const [filterHandle, setFilterHandle] = useState("");
  return (
    <div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <CreateDataset />
          </Paper>
        </Box>
      </Modal>
      <Box>
        <Stack direction="row" spacing={2}>
          <Paper
            component="form"
            elevation={1}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              flex: 1,
              // 圆角
              borderRadius: "18px",
            }}
          >
            <Typography sx={{ ml: 1 }}>搜索</Typography>
            <InputBase
              value={filterHandle}
              onChange={(e: any) => setFilterHandle(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="搜索数据集"
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button
            onClick={handleCreateClick}
            variant="contained"
            endIcon={<AddIcon />}
            sx={{
              borderRadius: "14px",
              "&:hover": {
                shadow: "none",
              },
            }}
          >
            创建数据集
          </Button>
        </Stack>
      </Box>
      <Box sx={{ my: 2 }}>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TitlebarImageList filter={filterHandle} />
        </Grid>
        <Grid item xs={3}>
          <LeaderBoard />
        </Grid>
      </Grid>
    </div>
  );
}

export default Workshop;
