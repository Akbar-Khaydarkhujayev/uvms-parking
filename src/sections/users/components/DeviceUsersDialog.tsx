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
import { useCreateDevice } from '../api/create';
import { IDevice } from '../api/getList';
import { useEditDevice } from '../api/edit';
import { useEffect, useState } from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Pagination,
  Table,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { useGetCompanies } from 'src/sections/companies/api/getList';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, TablePaginationCustom } from 'src/components/table';
import { TableBody } from '@mui/material';
import { IDeviceUsers, useGetDeviceUsers } from '../api/deviceUsersList';
import { useDebounce } from 'src/hooks/use-debounce';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ICompanyDialogProps {
  onClose: () => void;
  open: boolean;
  deviceId: string;
}

export function DeviceUsersDialog({ onClose, open, deviceId }: ICompanyDialogProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>('');

  const { t } = useTranslate();

  const debouncedQuery = useDebounce(search, 300);

  const headLabel = [
    { id: 'order', label: '№' },
    { id: 'username', label: t('username') },
    { id: 'enter', label: t('allowed enter time') },
    { id: 'exit', label: t('allowed exit time') },
  ];

  const handleClose = () => {
    onClose();
  };

  const { data: deviceUsers } = useGetDeviceUsers({
    device_id: deviceId,
    pageNumber: page,
    pageSize: pageSize,
    search: debouncedQuery,
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {t('device users')}

          <TextField
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            minWidth: 320,
            borderRadius: 3,
            border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <Scrollbar sx={{ maxHeight: 'calc(100vh - 170px)' }}>
            <Table
              stickyHeader
              sx={{
                minWidth: 320,
                borderRadius: 2,
              }}
            >
              <TableHeadCustom headLabel={headLabel} />

              <TableBody>
                {deviceUsers?.data?.map((deviceUser, index) => (
                  <RowItem key={index} row={deviceUser} order={index + 1} />
                ))}

                {(!deviceUsers || deviceUsers?.data?.length === 0) && (
                  <TableNoData
                    notFound
                    sx={{
                      m: -1,
                      borderRadius: 3,
                      overflow: 'hidden',
                      backgroundColor: (theme) => theme.palette.background.paper,
                      border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
                    }}
                  />
                )}
              </TableBody>
            </Table>
          </Scrollbar>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              borderTop: (theme) => `solid 2px ${theme.palette.background.neutral}`,
              bgcolor: 'background.neutral',
            }}
          >
            <Pagination
              shape="circular"
              page={page}
              onChange={(_e, value) => setPage(value)}
              count={deviceUsers?.pageCount || 1}
              variant="text"
              sx={{
                my: 1.5,
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      {/* <DialogActions>
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
      </DialogActions> */}
    </Dialog>
  );
}

type RowItemProps = {
  row: IDeviceUser;
  order: number;
};

function RowItem({ row, order }: RowItemProps) {
  const { t } = useTranslate();

  return (
    <>
      <TableRow>
        <TableCell>{order}</TableCell>

        <TableCell>{row.user_Name}</TableCell>

        <TableCell>{row.valid_StartTime}</TableCell>

        <TableCell>{row.valid_EndTime}</TableCell>
      </TableRow>
    </>
  );
}
