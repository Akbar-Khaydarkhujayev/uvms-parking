import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export interface ICompanyStats {
  company_Stat: {
    company_id: string;
    companyName: string;
    company_TotalDevices: number;
    total_Enter: number;
    total_Exit: number;
  }[];
  categories: string[];
  data: {
    name: string;
    data: number[];
  }[];
}

export interface IDevice {
  log_id: number;
  user_ID: string;
  the_date: string;
  dev_Name: string;
}

interface ICompanyStatsBody {
  start_time: string;
  end_time: string;
}

const getCompanyStats = (body: ICompanyStatsBody): Promise<ICompanyStats> =>
  axiosInstance.post(endpoints.companies.stats, body).then((res) => res.data);

const getDeviceStats = (): Promise<IDevice[]> =>
  axiosInstance.post(endpoints.companies.list).then((res) => res.data);

export const useGetCompanyStats = (params: ICompanyStatsBody) =>
  useQuery({
    queryKey: ['company-stats'],
    queryFn: () => getCompanyStats(params),
  });

export const useGetDeviceStats = () =>
  useQuery({
    queryKey: ['device-stats'],
    queryFn: getDeviceStats,
  });
