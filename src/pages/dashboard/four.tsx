import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { StatisticsView } from 'src/sections/statistics/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Socket</title>
      </Helmet>

      <StatisticsView />
    </>
  );
}
