import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';
import { ICamera } from 'src/sections/devices/api/camera/list';

interface IBody {
  ip: string;
  action: number;
}

interface ToggleBarrierParams {
  data: IBody;
  params: any;
}

export const toggleBarrier = ({ data, params }: ToggleBarrierParams) => {
  return axiosInstance
    .post(endpoints.barrier, data, {
      params,
    })
    .then((res) => res.data);
};

export const useToggleBarrier = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: ({ data, params }: ToggleBarrierParams) => toggleBarrier({ data, params }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['barrier'] });
      toast.success(t(res.message));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
