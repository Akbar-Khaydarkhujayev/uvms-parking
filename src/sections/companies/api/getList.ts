import { useQuery } from '@tanstack/react-query';
import { IDevice } from 'src/sections/devices/api/device/getList';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface ICompany {
  id: string;
  name: string;
  created_At: string;
  devices_Info: IDevice[];
}

const getCompanies = (): Promise<ICompany[]> =>
  axiosInstance.get(endpoints.companies.list).then((res) => res.data);

export const useGetCompanies = () =>
  useQuery({
    queryKey: ['company'],
    queryFn: getCompanies,
  });
