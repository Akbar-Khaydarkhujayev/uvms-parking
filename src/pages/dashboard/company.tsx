import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useTranslate } from 'src/locales';

import { BlankView } from 'src/sections/blank/view';
import { CompaniesView } from 'src/sections/companies/view';

// ----------------------------------------------------------------------

export default function CompaniesPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> {t('companies')}</title>
      </Helmet>

      <CompaniesView />
    </>
  );
}
