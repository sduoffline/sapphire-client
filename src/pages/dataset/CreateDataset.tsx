import React from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CreateDataset() {
  return (
    <div>
      <Typography component="h1" variant="h5">
        创建数据集
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="name"
          label="数据集名称"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="description"
          label="数据集描述"
          name="description"
          autoComplete="description"
        />
        {/* 上传数据集封面图片 */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, alignItems: 'center', paddingX: 2 }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              justifyItems: 'center',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Typography>封面预览</Typography>
          </div>
          <div style={{ flexGrow: 1 }} />
          <Stack direction="column" spacing={1}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              上传封面
              <input type="file" hidden />
            </Button>
            <Typography variant="caption" color="textSecondary">
              请上传一张封面图片
            </Typography>
          </Stack>
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          创建数据集
        </Button>
      </Box>
    </div>
  );
}
