import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { Chart, useChart, ChartLegends } from 'src/components/chart';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  series: {
    categories: string[];
    data: {
      name: string;
      data: number[];
    }[];
  };
};

export function CompanyBarChart({ title, series, ...other }: Props) {
  const theme = useTheme();
  const { t } = useTranslate();

  const totalEnters = series?.data?.[0]?.data?.reduce((a, b) => a + b, 0);
  const totalExit = series?.data?.[1]?.data?.reduce((a, b) => a + b, 0);

  const chartColors = [theme.palette.primary.dark, hexAlpha(theme.palette.error.main, 0.48)];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2, colors: ['transparent'] },
    xaxis: { categories: series?.categories },
    tooltip: { y: { formatter: (value: number) => `${value}` } },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        action={
          <ChartLegends
            colors={chartOptions?.colors}
            labels={series.data.map((item) => t(item.name))}
            values={[fShortenNumber(totalEnters), fShortenNumber(totalExit)]}
            sx={{ px: 3, gap: 3 }}
          />
        }
      />

      <Chart
        type="bar"
        series={series?.data}
        options={chartOptions}
        height="85%"
        sx={{ py: 2.5, pt: 0, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
