import React from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

function Workshop() {
  return (
    <div>
      <Box>
        <Stack direction="row" spacing={2}>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              // width: 400,
              flex: 1,
            }}
          >
            <Typography sx={{ ml: 1 }}>搜索</Typography>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="搜索数据集" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" endIcon={<AddIcon />}>
            创建数据集
          </Button>
        </Stack>
      </Box>
      <Box sx={{ my: 2 }}>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 2,
            }}
          >
            Primary
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              p: 2,
            }}
          >
            Secondary
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Workshop;
