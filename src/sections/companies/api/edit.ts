import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { FormSchemaType } from '../components/formSchema';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const editCompany = (data: FormSchemaType) => {
  return axiosInstance.put(endpoints.companies.edit(data.id!, data.company_name));
};

export const useEditCompany = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: editCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast.success(t('successfully updated'));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
