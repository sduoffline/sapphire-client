import {
  Chip,
  Stack,
  InputAdornment,
  ImageList,
  ImageListItem,
  Button,
  TextField,
} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import DownloadIcon from '@mui/icons-material/Download';

const categoryData = ['分类1', '分类2', '分类3', '分类4', '分类5'];

const imageData = Array.from(new Array(16)).map((_, index) => ({
  id: index,
  src: `https://source.unsplash.com/random?sig=${index}`,
}));

export default function PreviewTab() {
  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ m: 2, alignItems: 'center' }}>
        {categoryData.map((category) => (
          <Chip
            key={category}
            label={category}
            variant="outlined"
            onClick={() => {}}
            color="primary"
          />
        ))}
        <div style={{ flexGrow: 1 }} />
        <TextField
          label="搜索"
          variant="standard"
          size="small"
          inputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: 12,
          }}
        />
        {/* 下载按钮 */}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<DownloadIcon />}
        >
          下载
        </Button>
      </Stack>
      <ImageList sx={{ padding: 2 }} cols={4}>
        {imageData.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.src} alt="" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
