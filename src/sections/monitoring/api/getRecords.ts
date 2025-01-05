import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface IRecords {
  plate: string;
  enter_time: string;
  exit_time: string;
  price: number;
  time: number;
  camera_ip: string;
}

const getRecords = (): Promise<IRecords[]> =>
  axiosInstance.get(endpoints.records).then((res) => res.data);

export const useGetRecords = () =>
  useQuery({
    queryKey: ['records'],
    queryFn: () => getRecords(),
  });
