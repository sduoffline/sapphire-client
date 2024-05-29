import {
  Chip,
  Stack,
  InputAdornment,
  ImageList,
  ImageListItem,
  Button,
  TextField,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const categoryData = ["分类1", "分类2", "分类3", "分类4", "分类5"];

const imageData = Array.from(new Array(16)).map((_, index) => ({
  id: index,
  src: `https://source.unsplash.com/random?sig=${index}`,
}));

interface PreviewTabProps {
  imgs: { imgUrl: string; embeddingUrl: string }[] | null | undefined;
}

export default function PreviewTab({ imgs }: PreviewTabProps) {
  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ m: 2, alignItems: "center" }}>
        {/* {categoryData.map((category) => (
          <Chip
            key={category}
            label={category}
            variant="outlined"
            onClick={() => {}}
            color="primary"
          />
        ))} */}
        <div style={{ flexGrow: 1 }} />
        {/* <TextField
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
        /> */}
        {/* 下载按钮 */}
      </Stack>
      <ImageList sx={{ padding: 2 }} cols={4}>
        {imgs!.slice(0, 8).map((item) => (
          // <ImageListItem key={item.imgUrl}>
          <img src={item.imgUrl} alt="" style={{ width: "300px", margin: 1 }} />
          // </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
