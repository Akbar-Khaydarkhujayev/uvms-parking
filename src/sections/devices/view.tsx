import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Stack, Button, TextField, Pagination, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';

import { fDate } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useGetCameras } from './api/camera/list';
import { useGetDevices } from './api/device/getList';
import { useDeleteCamera } from './api/camera/delete';
import { useDeleteDevice } from './api/device/delete';
import { CameraDialog } from './components/CameraDialog';
import { DeviceDialog } from './components/DeviceDialog';

import type { ICamera } from './api/camera/list';
import type { IDevice } from './api/device/getList';

// ----------------------------------------------------------------------

const directions = [
  { value: 1, label: 'enter' },
  { value: 2, label: 'exit' },
];

export function DevicesView() {
  const { t } = useTranslate();
  const deviceDialog = useBoolean();
  const cameraDialog = useBoolean();

  const [device, setDevice] = useState<IDevice | null>(null);
  const [devicePage, setDevicePage] = useState(1);
  const [devicePageSize] = useState(15);
  const [deviceSearch, setDeviceSearch] = useState<string>('');

  const [camera, setCamera] = useState<ICamera | null>(null);
  const [userSearch, setUserSearch] = useState<string>('');

  const deviceDebouncedQuery = useDebounce(deviceSearch, 300);

  const userDebouncedQuery = useDebounce(userSearch, 300);

  const { data: devices } = useGetDevices({
    pageNumber: devicePage,
    pageSize: devicePageSize,
    data: deviceDebouncedQuery,
  });

  const [chosenDevice, setChoosenDevice] = useState<IDevice | null>(null);

  const { data: cameras } = useGetCameras({
    device_id: chosenDevice?.device_ID,
    company_id: chosenDevice?.company_id,
    data: userDebouncedQuery,
  });

  useEffect(() => {
    if (devices) setChoosenDevice(devices.data[0] || null);
  }, [devices]);

  const { mutate: deleteDeviceMutation } = useDeleteDevice();
  const { mutate: deleteCameraMutation } = useDeleteCamera();

  const deviceHeadLabel = [
    { id: 'order', label: '№' },
    { id: 'name', label: t('device name') },
    { id: 'username', label: t('username') },
    { id: 'password', label: t('password') },
    { id: 'created', label: t('created at') },
    { id: 'status', label: t('status'), align: 'center' },
    { id: '' },
  ];

  const CamerasTableHead = [
    { id: 'order', label: '№' },
    { id: 'ip', label: t('IP') },
    { id: 'port', label: t('port') },
    { id: 'username', label: t('username') },
    { id: 'password', label: t('password') },
    { id: 'direction', label: t('direction') },
    { id: 'created', label: t('created at') },
    { id: 'status', label: t('status'), align: 'center' },
    { id: '' },
  ];

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: 0, pt: 2 }}>
      <Stack
        spacing={1}
        display="flex"
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box width="40%">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              mx: 1,
            }}
          >
            <Typography variant="h4"> {t('devices')} </Typography>

            <Box display="flex" gap={2}>
              <TextField
                placeholder={t('search')}
                value={deviceSearch}
                onChange={(e) => setDeviceSearch(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                size="medium"
                variant="contained"
                sx={{ px: 4 }}
                onClick={deviceDialog.onTrue}
                endIcon={<Iconify icon="gridicons:add" />}
              >
                {t('create')}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: 1,
              borderRadius: 3,
              border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
              overflow: 'hidden',
            }}
          >
            <Scrollbar sx={{ height: 'calc(100vh - 290px)', maxHeight: 'calc(100vh - 290px)' }}>
              <Table
                stickyHeader
                sx={{
                  borderRadius: 2,
                }}
              >
                <TableHeadCustom headLabel={deviceHeadLabel} />

                <TableBody>
                  {devices?.data.map((item, index) => (
                    <DeviceRowItem
                      key={item.id}
                      row={item}
                      order={index + 1}
                      deviceId={chosenDevice?.device_ID}
                      setDevice={setDevice}
                      setChoosenDevice={setChoosenDevice}
                      deleteMutation={deleteDeviceMutation}
                      openDeviceDialog={deviceDialog.onTrue}
                    />
                  ))}

                  {(!devices || devices.data.length === 0) && (
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
                page={devicePage}
                onChange={(_e, value) => setDevicePage(value)}
                count={devices?.pageCount || 1}
                variant="text"
                sx={{
                  my: 1.5,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box width="60%">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              mx: 1,
            }}
          >
            <Typography variant="h4"> {t('cameras')} </Typography>

            <Box display="flex" gap={2}>
              <TextField
                placeholder={t('search')}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                size="medium"
                variant="contained"
                sx={{ px: 4 }}
                onClick={cameraDialog.onTrue}
                endIcon={<Iconify icon="gridicons:add" />}
              >
                {t('create')}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: 1,
              borderRadius: 3,
              border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
              overflow: 'hidden',
            }}
          >
            <Scrollbar sx={{ height: 'calc(100vh - 232px)', maxHeight: 'calc(100vh - 232px)' }}>
              <Table
                stickyHeader
                sx={{
                  minWidth: 320,
                  borderRadius: 2,
                }}
              >
                <TableHeadCustom headLabel={CamerasTableHead} />

                <TableBody>
                  {cameras?.map((item, index) => (
                    <CameraRowItem
                      key={item.id}
                      row={item}
                      order={index + 1}
                      setCamera={setCamera}
                      deleteMutation={deleteCameraMutation}
                      openCameraDialog={cameraDialog.onTrue}
                    />
                  ))}

                  {(!cameras || cameras?.length === 0) && (
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
          </Box>
        </Box>
      </Stack>

      <DeviceDialog
        onClose={deviceDialog.onFalse}
        open={deviceDialog.value}
        device={device}
        setDevice={setDevice}
      />

      <CameraDialog
        onClose={cameraDialog.onFalse}
        open={cameraDialog.value && !!chosenDevice?.device_ID}
        camera={camera}
        device_id={chosenDevice?.device_ID!}
        setCamera={setCamera}
      />
    </DashboardContent>
  );
}

type DeviceRowItemProps = {
  row: IDevice;
  order: number;
  deviceId?: string;
  setDevice: (values: IDevice) => void;
  deleteMutation: (id: string) => void;
  setChoosenDevice: (device: IDevice) => void;
  openDeviceDialog: () => void;
};

function DeviceRowItem({
  row,
  order,
  deviceId,
  setDevice,
  deleteMutation,
  setChoosenDevice,
  openDeviceDialog,
}: DeviceRowItemProps) {
  const { t } = useTranslate();
  const popover = usePopover();
  const confirm = useBoolean();

  const handleEdit = () => {
    setDevice(row);
    openDeviceDialog();
    popover.onClose();
  };

  const handleDelete = () => {
    deleteMutation(row.device_ID);
    popover.onClose();
  };

  return (
    <>
      <TableRow
        hover={row.device_ID !== deviceId}
        sx={{
          cursor: 'pointer',
          backgroundColor: row.device_ID === deviceId ? 'primary.darker' : 'inherit',
        }}
        onClick={() => setChoosenDevice(row)}
      >
        <TableCell sx={{ cursor: 'pointer', color: 'text.primary.main' }}>{order}</TableCell>
        <TableCell>{row.device_Name}</TableCell>
        <TableCell align={row.userName ? 'left' : 'center'}>{row.userName ?? '-'}</TableCell>
        <TableCell align={row.userName ? 'left' : 'center'}>{row.password ?? ' - '}</TableCell>
        <TableCell>{fDate(row.created_At)}</TableCell>
        <TableCell align="center">
          {row.status}
          <Label variant="filled" color={row.status ? 'success' : 'error'}>
            {row.status}
          </Label>
        </TableCell>
        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={(event) => {
              event.stopPropagation();
              popover.onOpen(event);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <Iconify icon="basil:edit-outline" />
            {t('edit')}
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={confirm.onTrue} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            {t('delete')}
          </MenuItem>

          <ConfirmDialog
            open={confirm.value}
            onClose={confirm.onFalse}
            title={t('delete')}
            content="Are you sure you want to delete?"
            action={
              <Button variant="contained" color="error" onClick={handleDelete}>
                {t('delete')}
              </Button>
            }
          />
        </MenuList>
      </CustomPopover>
    </>
  );
}

type CameraRowItemProps = {
  row: ICamera;
  order: number;
  setCamera: (user: ICamera) => void;
  deleteMutation: (id: number) => void;
  openCameraDialog: () => void;
};

function CameraRowItem({
  row,
  order,
  setCamera,
  deleteMutation,
  openCameraDialog,
}: CameraRowItemProps) {
  const { t } = useTranslate();
  const popover = usePopover();
  const confirm = useBoolean();

  const handleEdit = () => {
    popover.onClose();
    setCamera(row);
    openCameraDialog();
  };

  const handleDelete = () => {
    popover.onClose();
    deleteMutation(row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ cursor: 'pointer', color: 'text.primary.main' }}>{order}</TableCell>
        <TableCell>{row.ip}</TableCell>
        <TableCell>{row.port}</TableCell>
        <TableCell>{row.username ?? ' - '}</TableCell>
        <TableCell>{row.password ?? ' - '}</TableCell>
        <TableCell>
          {t(directions.find((direction) => direction.value === row.direction)?.label || '')}
        </TableCell>
        <TableCell>{fDate(row.created_At)}</TableCell>
        <TableCell align="center">
          {row.status}
          <Label variant="filled" color={row.status ? 'success' : 'error'}>
            {row.status}
          </Label>
        </TableCell>
        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={(event) => {
              event.stopPropagation();
              popover.onOpen(event);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <Iconify icon="basil:edit-outline" />
            {t('edit')}
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={confirm.onTrue} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            {t('delete')}
          </MenuItem>

          <ConfirmDialog
            open={confirm.value}
            onClose={confirm.onFalse}
            title={t('delete')}
            content="Are you sure you want to delete?"
            action={
              <Button variant="contained" color="error" onClick={handleDelete}>
                {t('delete')}
              </Button>
            }
          />
        </MenuList>
      </CustomPopover>
    </>
  );
}
