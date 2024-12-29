import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useTranslate } from 'src/locales';

import { MonitoringView } from 'src/sections/monitoring/view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> {t('monitoring')}</title>
      </Helmet>

      <MonitoringView />
    </>
  );
}
