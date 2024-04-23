import { useQuery } from '@tanstack/react-query';

async function getDatasets() {
  // 延迟 1 秒，模拟网络请求
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return Array.from({ length: 10 }, (_, i) => ({
    img: `https://source.unsplash.com/random?sig=${i}`,
    name: `Dataset ${i + 1}`,
  }));
}

export default function useDataset() {
  return useQuery({ queryKey: ['datasets'], queryFn: getDatasets });
}
