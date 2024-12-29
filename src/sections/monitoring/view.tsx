import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { useTranslate } from 'src/locales';
import { Avatar, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { ICompany } from '../companies/api/getList';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

const companies: ICompany[] = [
  {
    id: '1',
    name: 'Company 1',
    created_At: '2021-10-10',
  },
  {
    id: '2',
    name: 'Company 2',
    created_At: '2021-10-10',
  },
  {
    id: '3',
    name: 'Company 3',
    created_At: '2021-10-10',
  },
  {
    id: '4',
    name: 'Company 4',
    created_At: '2021-10-10',
  },
  {
    id: '5',
    name: 'Company 5',
    created_At: '2021-10-10',
  },
  {
    id: '1',
    name: 'Company 1',
    created_At: '2021-10-10',
  },
  {
    id: '2',
    name: 'Company 2',
    created_At: '2021-10-10',
  },
  {
    id: '3',
    name: 'Company 3',
    created_At: '2021-10-10',
  },
  {
    id: '4',
    name: 'Company 4',
    created_At: '2021-10-10',
  },
  {
    id: '5',
    name: 'Company 5',
    created_At: '2021-10-10',
  },
  {
    id: '5',
    name: 'Company 5',
    created_At: '2021-10-10',
  },
];

export function MonitoringView() {
  const { t } = useTranslate();

  const headLabel = [
    { id: 'order', label: '№' },
    { id: 'name', label: t('company name') },
    { id: 'enters', label: t('enters') },
    { id: 'exits', label: t('exits') },
  ];

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: 0, pt: 2 }}>
      <Grid container spacing={2} height="64px" mb={2}>
        {[
          'primary.main',
          'secondary.main',
          'success.main',
          'error.main',
          'info.main',
          'error.darker',
          'warning.main',
          'info.darker',
          'primary.main',
          'secondary.main',
          'info.main',
          'warning.main',
        ].map((color) => (
          <Grid item xs={1}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 1,
                bgcolor: color,
                borderRadius: 2,
              }}
            >
              Camera 1
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box height="calc(100vh - 900px)">
        <Grid container spacing={2}>
          <Grid item xs={4}>
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
                  }}
                >
                  <TableHeadCustom headLabel={headLabel} />

                  <TableBody>
                    {companies.map((company, index) => (
                      <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
                        <TableCell>
                          <Typography>{index + 1}</Typography>
                        </TableCell>

                        <TableCell>{company.name}</TableCell>

                        <TableCell>{company.id}</TableCell>

                        <TableCell>
                          <Label variant="outlined" color="success">
                            {company.created_At}
                          </Label>
                        </TableCell>
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
          <Grid item container xs={8} spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
                }}
              >
                <Avatar
                  sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  variant="rounded"
                  src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
                }}
              >
                <Avatar
                  sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  variant="rounded"
                  src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
                }}
              >
                <Avatar
                  sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  variant="rounded"
                  src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
                }}
              >
                <Avatar
                  sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  variant="rounded"
                  src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DashboardContent>
  );
}
