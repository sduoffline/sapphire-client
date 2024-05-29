import { useQuery } from "@tanstack/react-query";
import { Dataset } from "../types";
import { DataSetProps } from "../components/helpers/Interface";
import { dataset } from "../constants/mockdata";

async function fetchSingleDataset(id: number): Promise<DataSetProps> {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return dataset;
}

export default function useSingleDataset(id: number) {
  return useQuery({
    queryKey: ["dataset", id],
    queryFn: () => fetchSingleDataset(id),
  });
}
