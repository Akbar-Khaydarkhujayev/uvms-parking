import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { IParkingInfo } from './getInfoByPlate';

const pay = (data: IParkingInfo): Promise<{ link: string }> =>
  axiosInstance.post(endpoints.user.pay, data).then((res) => res.data);

export const usePay = () =>
  useMutation({
    mutationFn: pay,
    onSuccess: (res) => {
      window.open(res.link, '_blank');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
