import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { TableHeadCustom, TableNoData } from 'src/components/table';
import { DashboardContent } from 'src/layouts/dashboard';
import { Card, Grid, Paper, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';
import { ICompanyStats, useGetCompanyStats } from './api/getList';
import { Scrollbar } from 'src/components/scrollbar';
import { fNumber } from 'src/utils/format-number';
import { Label } from 'src/components/label';
import { CompanyBarChart } from './components/CompaniesBarChart';
import { CompaniesLineChart } from './components/CompaniesLineChart';
import { Avatar } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import useWebSocket from 'src/hooks/use-web-socket';
import { fDateTime } from 'src/utils/format-time';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

export function DashboardView() {
  const { t } = useTranslate();
  const { user } = useAuthContext();

  const { data } = useWebSocket(user?.accessToken);

  const { data: companies } = useGetCompanyStats({
    start_time: dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss'),
    end_time: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
  });
  console.log(companies);
  const headLabel = [
    { id: 'order', label: '№' },
    { id: 'name', label: t('company name') },
    { id: 'devices', label: t('total devices') },
    { id: 'enters', label: t('enters') },
    { id: 'exits', label: t('exits') },
  ];

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: 0, pt: 2 }}>
      <Box sx={{ flexGrow: 1, height: 'calc(100vh - 170px)', pb: 2 }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item container xs={10} spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={12} md={6} sx={{ height: '50%' }}>
              <CompanyBarChart
                sx={{ height: 1 }}
                title={t('company stats')}
                series={{
                  categories: companies?.categories || [],
                  data: companies?.data || [],
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ height: '50%' }}>
              <Box
                sx={{
                  minWidth: 320,
                  borderRadius: 3,
                  border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  overflow: 'hidden',
                }}
                height={1}
              >
                <Scrollbar sx={{ maxHeight: '100%' }}>
                  <Table
                    stickyHeader
                    sx={{
                      minWidth: 320,
                      borderRadius: 2,
                    }}
                  >
                    <TableHeadCustom headLabel={headLabel} />

                    <TableBody>
                      {companies?.company_Stat?.map((company, index) => (
                        <RowItem key={index} row={company} order={index + 1} />
                      ))}

                      {(!companies || companies?.company_Stat?.length === 0) && (
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
            <Grid item xs={12} sx={{ height: '50%' }}>
              <CompaniesLineChart
                title={t('company stats')}
                categories={companies?.categories || []}
                series={{
                  data:
                    companies?.data?.map((item) => ({
                      ...item,
                      data: [0, ...item.data, 0],
                    })) || [],
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{ height: '100%' }}>
            <Box
              sx={{
                height: '100%',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Scrollbar sx={{ maxHeight: '100%' }}>
                {data?.map((item, index) => (
                  <Card key={index} sx={{ p: 2, mb: 2 }}>
                    <Box display="flex" gap={2} mb={2}>
                      <Avatar
                        variant="rounded"
                        sx={{ flex: 1, height: 'auto' }}
                        src={`data:image/png;base64,${item.FaceImage}`}
                      />
                      <Avatar
                        variant="rounded"
                        sx={{ flex: 1, height: 'auto' }}
                        src={`data:image/png;base64,${item.fullImage}`}
                      />
                    </Box>
                    <Box display="flex" gap={2}>
                      <Typography fontWeight="bold">{t('user')}:</Typography> {item.UserName}
                    </Box>
                    <Box display="flex" gap={2}>
                      <Typography fontWeight="bold">{t('device')}:</Typography> {item.DeviceID}
                    </Box>
                    <Box display="flex" gap={2}>
                      <Typography fontWeight="bold">{t('date')}: </Typography>
                      {fDateTime(item.The_date)}
                    </Box>
                  </Card>
                ))}
              </Scrollbar>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DashboardContent>
  );
}

type RowItemProps = {
  row: ICompanyStats['company_Stat'][0];
  order: number;
};

function RowItem({ row, order }: RowItemProps) {
  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell>
          <Typography>{order}</Typography>
        </TableCell>

        <TableCell>{row.companyName}</TableCell>

        <TableCell>{fNumber(row.company_TotalDevices)}</TableCell>

        <TableCell>
          <Label variant="outlined" color="success">
            {fNumber(row.total_Enter)}
          </Label>
        </TableCell>

        <TableCell>
          <Label variant="outlined" color="error">
            {fNumber(row.total_Exit)}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
