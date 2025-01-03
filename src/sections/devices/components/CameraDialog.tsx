import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslate } from 'src/locales';
import { useForm } from 'react-hook-form';
import { Form, Field } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { cameraDefaultValue, CameraFormSchema, CameraFormSchemaType } from './formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditDevice } from '../api/device/edit';
import { useEffect } from 'react';
import { useGetCompanies } from 'src/sections/companies/api/getList';
import { ICamera } from '../api/camera/list';
import { getImage } from '../api/getImage';
import { UploadAvatar } from 'src/components/upload';
import dayjs from 'dayjs';
import { useCreateDeviceUser } from '../api/camera/create';
import { useEditDeviceUser } from '../api/camera/edit';
import { MenuItem } from '@mui/material';
import { useGetDevices } from '../api/device/getList';

// ----------------------------------------------------------------------

const directions = [
  { value: 1, label: 'enter' },
  { value: 2, label: 'exit' },
];

interface ICompanyDialogProps {
  onClose: () => void;
  open: boolean;
  device_id: string;
  camera: ICamera | null;
  setCamera: (deviceUser: ICamera | null) => void;
}

export function CameraDialog({ onClose, open, device_id, camera, setCamera }: ICompanyDialogProps) {
  const { t } = useTranslate();

  const { data: companies } = useGetCompanies();
  const { data: devices } = useGetDevices();

  const methods = useForm<CameraFormSchemaType>({
    resolver: zodResolver(CameraFormSchema),
    defaultValues: cameraDefaultValue,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleClose = () => {
    onClose();
    setCamera(null);
    reset(cameraDefaultValue);
  };

  const { mutate: create, isPending: createPending } = useCreateDeviceUser(handleClose);
  const { mutate: edit, isPending: editPending } = useEditDeviceUser(handleClose);

  useEffect(() => {
    if (camera?.id) reset(camera);
    else reset(cameraDefaultValue);
  }, [camera, reset]);

  const onSubmit = handleSubmit(
    async (data) => {
      if (data?.id) edit({ data, params: { camera_id: data.id } });
      else create({ data, params: { device_id } });
    },
    (err) => console.log(err)
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('add camera')}</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Field.Text margin="dense" fullWidth name="ip" label={t('IP')} />
          <Field.Text margin="dense" fullWidth name="port" label={t('port')} />
          <Field.Text margin="normal" fullWidth name="username" label={t('username')} />
          <Field.Text margin="normal" fullWidth name="password" label={t('password')} />
          <Field.Select margin="normal" fullWidth name="direction" label={t('direction')}>
            {directions.map((direction) => (
              <MenuItem key={direction.value} value={direction.value}>
                {t(direction.label)}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Select margin="normal" fullWidth name="company_ID" label={t('company')}>
            {companies?.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Select margin="normal" fullWidth name="device_ID" label={t('device')}>
            {devices?.data.map((device) => (
              <MenuItem key={device.id} value={device.device_ID}>
                {device.device_Name}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Checkbox sx={{ ml: -1, mt: 1 }} name="status" label={t('status')} />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={isSubmitting || createPending || editPending}
            variant="outlined"
            color="inherit"
          >
            {t('cancel')}
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || createPending || editPending}
          >
            {camera?.id ? t('edit') : t('create')}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
