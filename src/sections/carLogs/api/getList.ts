import { useQuery } from '@tanstack/react-query';
import { IPaginatedResponse } from 'src/types/default';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface ILog {
  plate: string;
  enter_time: string;
  exit_time: string;
  price: number;
  time: number;
  camera_ip: string;
}

interface IParams {
  pageNumber: number;
  pageSize: number;
  data: string;
}

const getLogs = (params?: IParams): Promise<IPaginatedResponse<ILog>> =>
  axiosInstance.get(endpoints.logs, { params }).then((res) => res.data);

export const useGetLogs = (params?: IParams) =>
  useQuery({
    queryKey: ['logs', params],
    queryFn: () => getLogs(params),
  });
