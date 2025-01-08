import { useQuery } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/utils/axios';

export interface IStats {
  company_name: string;
  total_price: number;
  entry_cars: number;
  exit_cars: number;
  difrence_cars: number;
}

const getStats = (): Promise<IStats[]> =>
  axiosInstance.get(endpoints.stats).then((res) => res.data);

export const useGetStats = () =>
  useQuery({
    queryKey: ['monitoring-stats'],
    queryFn: () => getStats(),
  });
