import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { CameraFormSchemaType } from '../../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

interface IParams {
  camera_id: number;
}

export const editDeviceUser = (data: CameraFormSchemaType, params: IParams) => {
  return axiosInstance.put(endpoints.camera, data, { params });
};

export const useEditDeviceUser = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: ({ data, params }: { data: CameraFormSchemaType; params: IParams }) =>
      editDeviceUser(data, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device-users'] });
      toast.success(t('successfully updated'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
