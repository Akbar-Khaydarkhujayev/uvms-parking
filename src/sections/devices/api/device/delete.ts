import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const deleteDevice = (id: string) => {
  return axiosInstance.delete(endpoints.device.delete(id)).then((res) => res.data);
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
      toast.success(t('successfully deleted'));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
