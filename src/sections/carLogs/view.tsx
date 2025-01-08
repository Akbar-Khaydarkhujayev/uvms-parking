import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import ListItemText from '@mui/material/ListItemText';

import { fDate, fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { DashboardContent } from 'src/layouts/dashboard';
import { InputAdornment, Pagination, TextField, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { ILog, useGetLogs } from './api/getList';
import { useDebounce } from 'src/hooks/use-debounce';
import { formatCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export function CarLogsView() {
  const { t } = useTranslate();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [search, setSearch] = useState<string>('');

  const deviceDebouncedQuery = useDebounce(search, 300);

  const { data: logs } = useGetLogs({
    pageNumber: page,
    pageSize: pageSize,
    data: deviceDebouncedQuery,
  });
  console.log(logs);
  const tableHead = [
    { id: 'order', label: '№' },
    { id: 'number', label: t('plate') },
    { id: 'enter', label: t('enter time') },
    { id: 'exit', label: t('out time') },
    { id: 'price', label: t('price'), align: 'right' },
    { id: 'time', label: t('time'), align: 'right' },
    { id: 'camera', label: t('camera ip'), align: 'right' },
  ];

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: 0, pt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mx: 1,
        }}
      >
        <Typography variant="h4"> {t('car logs')} </Typography>

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

      <Box
        sx={{
          minWidth: 320,
          borderRadius: 3,
          border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
          overflow: 'hidden',
        }}
      >
        <Scrollbar sx={{ height: 'calc(100vh - 290px)', maxHeight: 'calc(100vh - 290px)' }}>
          <Table
            stickyHeader
            sx={{
              minWidth: 320,
              borderRadius: 2,
            }}
          >
            <TableHeadCustom headLabel={tableHead} />

            <TableBody>
              {logs?.data?.map((log, index) => (
                <RowItem key={index} row={log} order={(page - 1) * pageSize + index + 1} />
              ))}

              {(!logs || logs.data.length === 0) && (
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
            count={logs?.pageCount || 1}
            variant="text"
            sx={{
              my: 1.5,
            }}
          />
        </Box>
      </Box>
    </DashboardContent>
  );
}

type RowItemProps = {
  row: ILog;
  order: number;
};

function RowItem({ row, order }: RowItemProps) {
  const { t } = useTranslate();

  return (
    <TableRow hover>
      <TableCell>{order}</TableCell>
      <TableCell>{row.plate}</TableCell>
      <TableCell>{fDateTime(row.enter_time)}</TableCell>
      <TableCell>{fDateTime(row.exit_time)}</TableCell>
      <TableCell align="right">{formatCurrency(row.price)} TJS</TableCell>
      <TableCell align="right">
        {row.time} {t('min')}
      </TableCell>
      <TableCell align="right">{row.camera_ip}</TableCell>
    </TableRow>
  );
}
