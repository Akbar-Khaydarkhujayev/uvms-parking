import { useQuery } from '@tanstack/react-query';
import { IPaginatedResponse } from 'src/types/default';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface IDeviceUsers {
  user_index: number;
  user_ID: string;
  user_Name: string;
  valid_EndTime: string;
  valid_StartTime: string;
}

interface IParams {
  device_id: string;
  pageNumber: number;
  pageSize: number;
  search: string;
}

const getDeviceUsers = (params: IParams): Promise<IPaginatedResponse<IDeviceUsers>> =>
  axiosInstance.get(endpoints.device.user.list, { params }).then((res) => res.data);

export const useGetDeviceUsers = (params: IParams) =>
  useQuery({
    queryKey: ['device-users', params],
    queryFn: () => getDeviceUsers(params),
  });
