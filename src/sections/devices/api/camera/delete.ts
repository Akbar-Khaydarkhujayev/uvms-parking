import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const deleteCamera = (camera_id: number) => {
  return axiosInstance
    .delete(endpoints.camera, {
      params: {
        camera_id,
      },
    })
    .then((res) => res.data);
};

export const useDeleteCamera = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: deleteCamera,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
      toast.success(t('successfully deleted'));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
