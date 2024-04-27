import { useEffect } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Container,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';

import useDatasets from '../../queries/useDatasets';
import { Dataset } from '../../types';

interface DatasetItemProps {
  item: Dataset;
}

function DatasetItem({ item }: DatasetItemProps) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/dataset/detail/${id}`);
  };

  return (
    <ImageListItem
      onClick={() => handleClick(item.id)}
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
        subtitle={item.description}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${item.name}`}
          >
            <ChevronRight />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}

export default function TitlebarImageList() {
  const {
    data: datasets,
    isError,
    isPending,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
  } = useDatasets();

  const handleScroll = () => {
    // 如果正在加载下一页数据，则不再加载
    if (isFetchingNextPage) {
      return;
    }

    const bias = 128;
    if (
      // 相差一定距离时加载下一页
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight + bias
    ) {
      return;
    }
    fetchNextPage();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div>
      {isPending && (
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Container>
      )}
      {isError && <div>Something went wrong...</div>}
      {isSuccess && (
        // 禁用滚动条
        <ImageList
          variant="masonry"
          cols={3}
          gap={12}
          sx={{ overflow: 'hidden' }}
        >
          {datasets.pages.map((page) =>
            page.map((item) => <DatasetItem key={item.id} item={item} />),
          )}
        </ImageList>
      )}
      {
        // 加载更多
        isFetchingNextPage && (
          <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Container>
        )
      }
    </div>
  );
}
