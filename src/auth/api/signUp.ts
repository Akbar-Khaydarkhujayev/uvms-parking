import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignUpSchemaType } from '../view/jwt';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const signUp = (data: SignUpSchemaType) =>
  axiosInstance.post(endpoints.auth.signUp, data).then((res) => res.data);

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast.success(t('successfully registered'));
      navigate('/auth/jwt/sign-in');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
