import Box from '@mui/material/Box';

import { DashboardContent } from 'src/layouts/dashboard';
import { useTranslate } from 'src/locales';
import {
  Avatar,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { Label } from 'src/components/label';
import { useGetRecords } from './api/getRecords';
import dayjs from 'dayjs';
import { useGetStats } from './api/getStats';
import { useGetDevices } from '../devices/api/device/getList';
import { useGetCameras } from '../devices/api/camera/list';
import { useToggleBarrier } from './api/toggleBarrier';
import useWebSocket from 'src/hooks/use-web-socket';
import { useAuthContext } from 'src/auth/hooks';
import { formatCurrency } from 'src/utils/format-number';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const directions: { [key: number]: string } = {
  1: 'enter',
  2: 'exit',
};

export function MonitoringView() {
  const { t } = useTranslate();
  const { user } = useAuthContext();

  const headLabel = [
    { id: 'order', label: '№' },
    { id: 'plate', label: t('plate') },
    { id: 'enter', label: t('enter time') },
    { id: 'out', label: t('out time') },
    { id: 'price', label: t('price'), align: 'right' },
    { id: 'time', label: t('time'), align: 'right' },
  ];

  const { data: records } = useGetRecords();
  const { data: stats } = useGetStats();

  const { data: devices } = useGetDevices({
    pageNumber: 1,
    pageSize: 1,
    data: '',
  });

  const { data: cameras } = useGetCameras({
    device_id: devices?.data?.[0]?.device_ID,
    company_id: devices?.data?.[0]?.company_id,
    data: '',
  });

  const { mutate: toggleBarrier } = useToggleBarrier();

  const { data } = useWebSocket(user?.accessToken);

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: 0, pt: 2 }}>
      <Box mb={2}>
        <Grid container spacing={4} height="82px">
          <Grid item xs={3}>
            <Label variant="outlined" sx={{ width: 1, height: 1, fontSize: 15 }}>
              {t('company name')}: {stats?.[0]?.company_name}
            </Label>
          </Grid>
          <Grid item xs={3}>
            <Label variant="outlined" sx={{ width: 1, height: 1, fontSize: 15 }}>
              {t('total cars in')}: {stats?.[0]?.entry_cars}
            </Label>
          </Grid>
          <Grid item xs={3}>
            <Label variant="outlined" sx={{ width: 1, height: 1, fontSize: 15 }}>
              {t('total cars out')}: {stats?.[0]?.exit_cars}
            </Label>
          </Grid>
          <Grid item xs={3}>
            <Label variant="outlined" sx={{ width: 1, height: 1, fontSize: 15 }}>
              {t('total price')}: {formatCurrency(stats?.[0]?.total_price ?? 0)} TJS
            </Label>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2} height="calc(100vh - 200px)">
          <Grid item container xs={5} spacing={2} sx={{ maxHeight: '100%' }}>
            <Grid item xs={12} sx={{ height: 0.8 }}>
              <Box
                sx={{
                  borderRadius: 3,
                  border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  overflow: 'hidden',
                  height: 1,
                }}
              >
                <Scrollbar sx={{ height: 1 }}>
                  <Table
                    stickyHeader
                    sx={{
                      minWidth: 320,
                      borderRadius: 2,
                      height: 1,
                    }}
                  >
                    <TableHeadCustom headLabel={headLabel} />

                    <TableBody>
                      {records?.map((record, index) => (
                        <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
                          <TableCell>{index + 1}</TableCell>

                          <TableCell>{record.plate}</TableCell>

                          <TableCell>
                            {dayjs(record.enter_time).format('MM/DD/YYYY HH:mm')}
                          </TableCell>

                          <TableCell>
                            {dayjs(record.exit_time).format('MM/DD/YYYY HH:mm')}
                          </TableCell>

                          <TableCell align="right">
                            <Label variant="outlined" color="success">
                              {formatCurrency(record.price)} TJS
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            {record.time} {t('min')}
                          </TableCell>
                        </TableRow>
                      ))}

                      {(!records || records?.length === 0) && (
                        <TableNoData
                          notFound
                          sx={{
                            m: -1,
                            py: 5.5,
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
            </Grid>
            <Grid item container xs={12} height={0.2} spacing={1}>
              <Grid item container xs={6} spacing={1}>
                <Grid item xs={12}>
                  <Typography textAlign="center" fontWeight="500">
                    {t('barrier')} 1
                  </Typography>
                </Grid>
                <Grid item container xs={12} spacing={1} height={0.47}>
                  {cameras
                    ?.filter((camera) => camera.barier_ID === 1 && camera.direction === 1)
                    .map((camera) => (
                      <>
                        <Grid item xs={6}>
                          <Label
                            variant="outlined"
                            color={camera.status ? 'success' : 'error'}
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {camera.ip} - {camera.status ? t('online') : t('offline')}
                          </Label>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            mb: 0.3,
                          }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            disabled={!camera.status}
                            sx={{ width: 1, height: 1 }}
                            onClick={() =>
                              toggleBarrier({
                                data: { ip: camera.ip, action: 1 },
                                params: { device_id: devices?.data?.[0]?.device_ID },
                              })
                            }
                          >
                            {t('open')}
                          </Button>
                        </Grid>
                      </>
                    ))}
                </Grid>
                <Grid item container xs={12} spacing={1} height={0.47}>
                  {cameras
                    ?.filter((camera) => camera.barier_ID === 2 && camera.direction === 1)
                    .map((camera) => (
                      <>
                        <Grid item xs={6}>
                          <Label
                            variant="outlined"
                            color={camera.status ? 'success' : 'error'}
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {camera.ip} - {camera.status ? t('online') : t('offline')}
                          </Label>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            mb: 0.3,
                          }}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ width: 1, height: 1 }}
                            disabled={!camera.status}
                            onClick={() =>
                              toggleBarrier({
                                data: { ip: camera.ip, action: 2 },
                                params: { device_id: devices?.data?.[0]?.device_ID },
                              })
                            }
                          >
                            {t('close')}
                          </Button>
                        </Grid>
                      </>
                    ))}
                </Grid>
              </Grid>
              <Grid item container xs={6} spacing={1}>
                <Grid item xs={12}>
                  <Typography textAlign="center" fontWeight="500">
                    {t('barrier')} 2
                  </Typography>
                </Grid>
                <Grid item container xs={12} spacing={1} height={0.47}>
                  {cameras
                    ?.filter((camera) => camera.barier_ID === 1 && camera.direction === 2)
                    .map((camera) => (
                      <>
                        <Grid item xs={6}>
                          <Label
                            variant="outlined"
                            color={camera.status ? 'success' : 'error'}
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {camera.ip} - {camera.status ? t('online') : t('offline')}
                          </Label>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            mb: 0.3,
                          }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            disabled={!camera.status}
                            sx={{ width: 1, height: 1 }}
                            onClick={() =>
                              toggleBarrier({
                                data: { ip: camera.ip, action: 1 },
                                params: { device_id: devices?.data?.[0]?.device_ID },
                              })
                            }
                          >
                            {t('open')}
                          </Button>
                        </Grid>
                      </>
                    ))}
                </Grid>
                <Grid item container xs={12} spacing={1} height={0.47}>
                  {cameras
                    ?.filter((camera) => camera.barier_ID === 2 && camera.direction === 2)
                    .map((camera) => (
                      <>
                        <Grid item xs={6}>
                          <Label
                            variant="outlined"
                            color={camera.status ? 'success' : 'error'}
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {camera.ip} - {camera.status ? t('online') : t('offline')}
                          </Label>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            mb: 0.3,
                          }}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ width: 1, height: 1 }}
                            disabled={!camera.status}
                            onClick={() =>
                              toggleBarrier({
                                data: { ip: camera.ip, action: 2 },
                                params: { device_id: devices?.data?.[0]?.device_ID },
                              })
                            }
                          >
                            {t('close')}
                          </Button>
                        </Grid>
                      </>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={7} spacing={2} sx={{ height: '100%', maxHeight: '100%' }}>
            {data?.map((item, index) => (
              <Grid item xs={6} key={index} sx={{ height: '50%', maxHeight: '50%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Typography textAlign="center" fontWeight="bold">
                    {t('barrier')} {index < 2 ? 1 : 2} | {t('direction')}:{' '}
                    {t(directions[index % 2 ? 2 : 1])}
                  </Typography>
                  {!item ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: (theme) => `solid 2px ${theme.palette.divider}`,
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={`${CONFIG.assetsDir}/logo/fulllogo_transparent.png`}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{
                          flexGrow: 1,
                          width: '100%',
                          overflow: 'hidden',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      >
                        <Avatar
                          variant="square"
                          src={`data:image/png;base64,${item.palte_image}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '16/9',
                          overflow: 'hidden',
                        }}
                      >
                        <Avatar
                          variant="square"
                          src={`data:image/png;base64,${item.car_image}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </DashboardContent>
  );
}
