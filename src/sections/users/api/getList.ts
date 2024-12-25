import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface IDevice {
  id: number;
  device_ID: string;
  device_Name: string;
  userName: string;
  password: string;
  created_At: string;
  ip: string;
  port: number;
  status: boolean;
  direction: number;
  company_id: string;
}

interface IParams {
  search: string;
}

const getDevices = (params: IParams): Promise<IDevice[]> =>
  axiosInstance.get(endpoints.device.list, { params }).then((res) => res.data);

export const useGetDevices = (params: IParams) =>
  useQuery({
    queryKey: ['device', params],
    queryFn: () => getDevices(params),
  });
