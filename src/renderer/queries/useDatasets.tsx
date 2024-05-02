import { useInfiniteQuery } from '@tanstack/react-query';
import { Dataset } from '../types';

async function fetchDatasets({ pageParam = 0 }): Promise<Dataset[]> {
  // 延迟几秒，模拟网络请求
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 500 + Math.random() * 1000);
  // });
  return Array.from({ length: 10 }, (_, index) => ({
    name: `Dataset ${pageParam + index + 1}`,
    description: 'Description',
    id: pageParam + index + 1,
    creator: 'Creator',
    img: `https://api.r10086.com/樱道随机图片api接口.php?图片系列=风景系列1`,
    time: '2021-10-01',
    type: 'Type',
    category: [
      {
        name: 'Category',
        count: 10,
      },
    ],
    total: 1000,
  }));
}

export default function useDatasets() {
  return useInfiniteQuery({
    queryKey: ['datasets'],
    queryFn: fetchDatasets,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });
}
