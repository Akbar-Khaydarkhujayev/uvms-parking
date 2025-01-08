import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import { toast } from 'src/components/snackbar';

import type { CameraFormSchemaType } from '../../components/formSchema';

export const createDeviceUser = (data: CameraFormSchemaType) =>
  axiosInstance.post(endpoints.camera, data).then((res) => res.data);

export const useCreateDeviceUser = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: ({ data }: { data: CameraFormSchemaType }) => createDeviceUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
      toast.success(t('successfully created'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
