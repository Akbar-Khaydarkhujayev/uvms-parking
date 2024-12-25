import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { FormSchemaType } from '../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const createDevice = (data: FormSchemaType) => {
  return axiosInstance.post(endpoints.device.create, data).then((res) => res.data);
};

export const useCreateDevice = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device'] });
      toast.success(t('successfully created'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
