import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { DeviceUserFormSchemaType } from '../../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

interface IParams {
  device_id: string;
}

export const editDeviceUser = (data: DeviceUserFormSchemaType, params: IParams) => {
  return axiosInstance.post(endpoints.device.user.edit, data, { params });
};

export const useEditDeviceUser = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: ({ data, params }: { data: DeviceUserFormSchemaType; params: IParams }) =>
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
