import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { useTranslate } from 'src/locales';
import { Avatar, Button, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { ICompany } from '../companies/api/getList';
import { Label } from 'src/components/label';
import useWebSocket from 'src/hooks/use-web-socket';
import { useAuthContext } from 'src/auth/hooks';
import img from './plate.png';

// ----------------------------------------------------------------------

const companies = [
  {
    id: '1',
    enter: '10:00',
    out: '11:00',
    price: '100',
    time: '1:00',
  },
  {
    id: '2',
    enter: '10:00',
    out: '11:00',
    price: '100',
    time: '1:00',
  },
  {
    id: '3',
    enter: '10:00',
    out: '11:00',
    price: '100',
    time: '1:00',
  },
];

export function MonitoringView() {
  const { t } = useTranslate();
  const { user } = useAuthContext();

  const headLabel = [
    { id: 'order', label: '№' },
    { id: 'enter', label: t('enter time'), align: 'right' },
    { id: 'out', label: t('out time'), align: 'right' },
    { id: 'price', label: t('price'), align: 'right' },
    { id: 'time', label: t('time'), align: 'right' },
  ];
  const { data } = useWebSocket(user?.token);

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: 0, pt: 2 }}>
      <Box>
        <Grid container spacing={2} height="calc(100vh - 140px)">
          <Grid item container xs={5} spacing={2} sx={{ maxHeight: '100%' }}>
            <Grid item xs={12} sx={{ height: 0.6 }}>
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
                      {companies.map((company, index) => (
                        <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
                          <TableCell>{index + 1}</TableCell>

                          <TableCell align="right">{company.enter}</TableCell>

                          <TableCell align="right">{company.out}</TableCell>

                          <TableCell align="right">
                            <Label variant="outlined" color="success">
                              {company.price} {t('sum')}
                            </Label>
                          </TableCell>

                          <TableCell align="right">{company.time}</TableCell>
                        </TableRow>
                      ))}

                      {(!companies || companies?.length === 0) && (
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
            <Grid item container xs={12} height={0.4} spacing={2}>
              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="success"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Online
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="success"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Online
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Button variant="contained" color="success" sx={{ width: 1, height: 1 }}>
                  Shlakbaum 1 ochish
                </Button>
              </Grid>

              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="error"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Offline
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="error"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Offline
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Button variant="contained" color="success" sx={{ width: 1, height: 1 }}>
                  Shlakbaum 1 ochish
                </Button>
              </Grid>

              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="success"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Offline
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="success"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Offline
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Button variant="contained" color="error" sx={{ width: 1, height: 1 }}>
                  Shlakbaum 1 ochish
                </Button>
              </Grid>

              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="error"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Offline
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Label
                  variant="outlined"
                  color="error"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Camera 1 - Offline
                </Label>
              </Grid>
              <Grid item xs={4} spacing={2}>
                <Button variant="contained" color="error" sx={{ width: 1, height: 1 }}>
                  Shlakbaum 1 ochish
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={7} spacing={2} sx={{ height: '100%', maxHeight: '100%' }}>
            {[...Array(4)].map((_, index) => (
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
                  <Box
                    sx={{
                      flexGrow: 1,
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={img}
                      alt={`Image 1 - ${index + 1}`}
                      style={{
                        width: '100%',
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
                    <img
                      src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt={`Image 2 - ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </DashboardContent>
  );
}
