import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { CameraFormSchemaType, FormSchemaType } from '../../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

interface IParams {
  device_id: string;
}

export const createDeviceUser = (data: CameraFormSchemaType, params: IParams) => {
  return axiosInstance
    .post(endpoints.camera, data, {
      params,
    })
    .then((res) => res.data);
};

export const useCreateDeviceUser = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: ({ data, params }: { data: CameraFormSchemaType; params: IParams }) =>
      createDeviceUser(data, params),
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
