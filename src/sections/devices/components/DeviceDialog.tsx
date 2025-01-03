import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslate } from 'src/locales';
import { useForm } from 'react-hook-form';
import { Form, Field } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { FormSchema, FormSchemaType } from './formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDevice } from '../api/device/create';
import { IDevice } from '../api/device/getList';
import { useEditDevice } from '../api/device/edit';
import { useEffect } from 'react';
import { MenuItem } from '@mui/material';
import { useGetCompanies } from 'src/sections/companies/api/getList';

// ----------------------------------------------------------------------

interface ICompanyDialogProps {
  onClose: () => void;
  open: boolean;
  device: IDevice | null;
  setDevice: (device: IDevice | null) => void;
}

const defaultValue = {
  device_Name: '',
  dev_Username: '',
  dev_Password: '',
  company_ID: '',
};

export function DeviceDialog({ onClose, open, device, setDevice }: ICompanyDialogProps) {
  const { t } = useTranslate();
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValue,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleClose = () => {
    onClose();
    setDevice(null);
    reset(defaultValue);
  };

  const { mutate: create, isPending: createPending } = useCreateDevice(handleClose);
  const { mutate: edit, isPending: editPending } = useEditDevice(handleClose);
  const { data: companies } = useGetCompanies();

  useEffect(() => {
    if (device?.id)
      reset({
        device_id: device.device_ID,
        device_Name: device.device_Name,
        dev_Username: device.userName,
        dev_Password: device.password,
        company_ID: device.company_id,
      });
    else reset(defaultValue);
  }, [device, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (data?.device_id) edit(data);
    else create(data);
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('create device')}</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Field.Text margin="dense" fullWidth name="device_Name" label={t('device name')} />
          <Field.Text margin="normal" fullWidth name="dev_Username" label={t('username')} />
          <Field.Text margin="normal" fullWidth name="dev_Password" label={t('password')} />
          <Field.Select margin="normal" fullWidth name="company_ID" label={t('company')}>
            {companies?.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Field.Select>
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
            {device?.id ? t('edit') : t('create')}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
