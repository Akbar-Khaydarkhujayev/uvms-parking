import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/utils/axios';

import type { FormSchemaType } from '../components/formSchema';

export interface IParkingInfo {
  plate: string;
  enter_time: string;
  exit_time: string;
  price: number;
  time: number;
}

const getParkingInfo = (data: FormSchemaType): Promise<IParkingInfo> =>
  axiosInstance
    .get(endpoints.user.plate, {
      params: {
        data: data.plate,
      },
    })
    .then((res) => res.data);

export const useGetParkingInfo = (onSuccess: (data: IParkingInfo) => void) =>
  useMutation({
    mutationFn: getParkingInfo,
    onSuccess,
    onError: (error) => {
      toast.error(error.message);
    },
  });
