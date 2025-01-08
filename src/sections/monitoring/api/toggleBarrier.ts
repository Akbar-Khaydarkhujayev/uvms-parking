import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import { toast } from 'src/components/snackbar';

interface IBody {
  ip: string;
  action: number;
}

interface ToggleBarrierParams {
  data: IBody;
  params: any;
}

export const toggleBarrier = ({ data, params }: ToggleBarrierParams) =>
  axiosInstance
    .post(endpoints.barrier, data, {
      params,
    })
    .then((res) => res.data);

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
