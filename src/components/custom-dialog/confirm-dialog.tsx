import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import type { ConfirmDialogProps } from './types';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function ConfirmDialog({
  open,
  title,
  action,
  content,
  onClose,
  ...other
}: ConfirmDialogProps) {
  const { t } = useTranslate();

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
