import { useQuery } from '@tanstack/react-query';
import { Dataset } from '../types';

async function fetchSingleDataset(id: number): Promise<Dataset> {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return {
    name: `Dataset ${id}`,
    description: 'Description',
    id,
    creator: 'Creator',
    img: `https://source.unsplash.com/random?sig=${id}`,
    time: '2021-10-01',
    type: 'Type',
    category: [
      {
        name: 'Category',
        count: 10,
      },
    ],
    total: 1000,
  };
}

export default function useSingleDataset(id: number) {
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: () => fetchSingleDataset(id),
  });
}
