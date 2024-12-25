import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslate } from 'src/locales';
import { useForm } from 'react-hook-form';
import { Form, Field } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { DeviceUserFormSchema, DeviceUserFormSchemaType } from './formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditDevice } from '../api/device/edit';
import { useEffect } from 'react';
import { useGetCompanies } from 'src/sections/companies/api/getList';
import { IDeviceUser } from '../api/deviceUser/deviceUsersList';
import { getImage } from '../api/getImage';
import { UploadAvatar } from 'src/components/upload';
import dayjs from 'dayjs';
import { useCreateDeviceUser } from '../api/deviceUser/create';
import { useEditDeviceUser } from '../api/deviceUser/edit';

// ----------------------------------------------------------------------

interface ICompanyDialogProps {
  onClose: () => void;
  open: boolean;
  device_id: string;
  deviceUser: IDeviceUser | null;
  setDeviceUser: (deviceUser: IDeviceUser | null) => void;
}

const defaultValue = {
  user_ID: '',
  user_Name: '',
  faceImage: '',
  valid_StartTime: dayjs().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
  valid_EndTime: dayjs().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
};

export function DeviceUsersDialog({
  onClose,
  open,
  device_id,
  deviceUser,
  setDeviceUser,
}: ICompanyDialogProps) {
  const { t } = useTranslate();

  const methods = useForm<DeviceUserFormSchemaType>({
    resolver: zodResolver(DeviceUserFormSchema),
    defaultValues: defaultValue,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleClose = () => {
    onClose();
    setDeviceUser(null);
    reset(defaultValue);
  };

  const { mutate: create, isPending: createPending } = useCreateDeviceUser(handleClose);
  const { mutate: edit, isPending: editPending } = useEditDeviceUser(handleClose);

  useEffect(() => {
    if (deviceUser?.user_ID)
      (async () => {
        const image = await getImage(deviceUser.user_index, true);

        reset({
          user_ID: deviceUser.user_ID,
          user_Name: deviceUser.user_Name,
          faceImage: image || '',
          valid_StartTime: deviceUser.valid_StartTime,
          valid_EndTime: deviceUser.valid_EndTime,
        });
      })();
    else reset(defaultValue);
  }, [deviceUser, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    data.faceImage = data.faceImage.replace(/^data:image\/\w+;base64,/, '');
    if (deviceUser?.user_ID) edit({ data, params: { device_id } });
    else create({ data, params: { device_id } });
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('add device user')}</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Field.UploadAvatar name="faceImage" sx={{ mb: 2 }} />
          <Field.Text margin="dense" fullWidth name="user_ID" label={t('user id')} />
          <Field.Text margin="normal" fullWidth name="user_Name" label={t('username')} />
          <Field.DateTimePicker
            sx={{ mt: 2, mb: 1 }}
            name="valid_StartTime"
            label={t('allowed enter time')}
          />
          <Field.DateTimePicker
            sx={{ mt: 2, mb: 1 }}
            name="valid_EndTime"
            label={t('allowed exit time')}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('cancel')}
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || createPending || editPending}
          >
            {deviceUser?.user_ID ? t('edit') : t('create')}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
