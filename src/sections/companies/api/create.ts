import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { FormSchemaType } from '../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const createCompany = async (data: FormSchemaType) => {
  return axiosInstance.post(endpoints.companies.create(data.company_name));
};

export const useCreateCompany = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast.success(t('successfully created'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
