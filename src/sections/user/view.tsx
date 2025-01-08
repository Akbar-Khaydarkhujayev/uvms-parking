import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AnimateLogo2 } from 'src/components/animate';
import { Field, Form } from 'src/components/hook-form';
import { useTranslate } from 'src/locales';
import { formatCurrency } from 'src/utils/format-number';
import { IParkingInfo, useGetParkingInfo } from './api/getInfoByPlate';
import { usePay } from './api/pay';
import { FormSchema, FormSchemaType } from './components/formSchema';

// ----------------------------------------------------------------------

export function PaymentView() {
  const { t } = useTranslate();
  const [parkingInfo, setParkingInfo] = useState<IParkingInfo | null>(null);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plate: '',
    },
  });

  const { mutate: getParkingInfo } = useGetParkingInfo((data) => {
    setParkingInfo(data);
    toast.success(t('successfully found'));
  });

  const { mutate: pay } = usePay();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(
    async (data) => {
      getParkingInfo(data);
    },
    (err) => console.log(err)
  );

  return (
    <Box
      height={1}
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <AnimateLogo2 sx={{ mb: 1, mx: 'auto' }} />

      <Typography fontSize={20} fontWeight={400}>
        UVMS {t('payment')}
      </Typography>

      {parkingInfo ? (
        <Box width={0.7} mt={1}>
          <Typography>{t('car plate')}:</Typography>
          <Typography textAlign="right" fontWeight={700} mt={1}>
            {parkingInfo.plate}
          </Typography>

          <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

          <Typography>{t('enter time')}:</Typography>
          <Typography textAlign="right" fontWeight={700} mt={1}>
            {dayjs(parkingInfo.enter_time).format('HH:mm - D MMMM YYYY')}
          </Typography>

          <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

          <Typography>{t('out time')}:</Typography>
          <Typography textAlign="right" fontWeight={700} mt={1}>
            {dayjs(parkingInfo.exit_time).format('HH:mm - D MMMM YYYY')}
          </Typography>

          <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

          <Typography>{t('price')}:</Typography>
          <Typography textAlign="right" fontWeight={700}>
            {formatCurrency(parkingInfo.price ?? 0)} TJS
          </Typography>

          <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

          <Typography>{t('time')}:</Typography>
          <Typography textAlign="right" fontWeight={700}>
            {parkingInfo.time} {t('min')}
          </Typography>

          <Box display="flex" width={1} gap={2} mt={3}>
            <Button
              variant="text"
              color="error"
              sx={{ width: 1 }}
              onClick={() => setParkingInfo(null)}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="outlined"
              sx={{ width: 1 }}
              color="success"
              onClick={() => pay(parkingInfo)}
            >
              {t('pay')}
            </Button>
          </Box>
        </Box>
      ) : (
        <Form methods={methods} onSubmit={onSubmit}>
          <Field.Text margin="dense" fullWidth name="plate" label={t('car plate')} />

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{ mt: 2, width: 1 }}
          >
            {t('search')}
          </LoadingButton>
        </Form>
      )}
    </Box>
  );
}
