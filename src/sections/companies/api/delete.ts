import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';

export const deleteCompany = (id: string) => {
  return axiosInstance.delete(endpoints.companies.delete(id)).then((res) => res.data);
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast.success(t('successfully deleted'));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
