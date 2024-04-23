import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

import useDataset from '../../queries/useDataset';

export default function TitlebarImageList() {
  const navigate = useNavigate();

  const handleClick = (title: string) => {
    navigate(`/dataset/detail/${title}`);
  };

  const { data, isPending, isError, isSuccess } = useDataset();

  return (
    <div>
      {isPending && <CircularProgress />}
      {isError && <div>Something went wrong...</div>}
      {isSuccess && (
        // 禁用滚动条
        <ImageList cols={3} gap={12} sx={{ overflow: 'hidden' }}>
          {data.map((item) => (
            <ImageListItem
              onClick={() => handleClick(item.name)}
              key={item.img}
              sx={{
                boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
                // hover效果
                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s',
                  shadow: 'none',
                },
              }}
            >
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.name}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.name}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}
