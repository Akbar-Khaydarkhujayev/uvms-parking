import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface ICamera {
  id: number;
  ip: string;
  port: string;
  username: string;
  password: string;
  direction: number;
  status: boolean;
  company_ID: string;
  created_At: string;
  barier_ID: number;
}

interface IParams {
  device_id?: string;
  company_id?: string;
  data: string;
}

const getDeviceUsers = (params: IParams): Promise<ICamera[]> =>
  axiosInstance.get(endpoints.camera, { params }).then((res) => res.data);

export const useGetCameras = (params: IParams) =>
  useQuery({
    queryKey: ['cameras', params],
    queryFn: () => getDeviceUsers(params),
    enabled: !!params.device_id && !!params.company_id,
  });
