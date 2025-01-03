import { useQuery } from '@tanstack/react-query';
import { IPaginatedResponse } from 'src/types/default';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface IDevice {
  id: number;
  device_ID: string;
  device_Name: string;
  userName: string;
  password: string;
  created_At: string;
  status: boolean;
  company_id: string;
}

interface IParams {
  pageNumber: number;
  pageSize: number;
  data: string;
}

const getDevices = (params?: IParams): Promise<IPaginatedResponse<IDevice>> =>
  axiosInstance.get(endpoints.device.list, { params }).then((res) => res.data);

export const useGetDevices = (params?: IParams) =>
  useQuery({
    queryKey: ['device', params],
    queryFn: () => getDevices(params),
  });
