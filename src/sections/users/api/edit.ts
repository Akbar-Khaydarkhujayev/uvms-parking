import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { FormSchemaType } from '../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const editDevice = (data: FormSchemaType) => {
  return axiosInstance.put(endpoints.device.edit(data.device_id!), data);
};

export const useEditDevice = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: editDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device'] });
      toast.success(t('successfully updated'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
