import { useQuery } from '@tanstack/react-query';
import { Dataset } from '../types';

async function fetchDatasets(): Promise<Dataset[]> {
  // 延迟 3 秒，模拟网络请求
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return Array.from({ length: 10 }, (_, index) => ({
    name: `Dataset ${index + 1}`,
    description: 'Description',
    id: index + 1,
    creator: 'Creator',
    img: `https://source.unsplash.com/random?sig=${index + 1}`,
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
  return useQuery({ queryKey: ['datasets'], queryFn: fetchDatasets });
}
