export interface Dataset {
  id: number;
  name: string;
  description: string;
  img: string;
  creator: string;
  time: string;
  type: string;
  category: {
    name: string;
    count: number;
  }[];
  total: number;
}
