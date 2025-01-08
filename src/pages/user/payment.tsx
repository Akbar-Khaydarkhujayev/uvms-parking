import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { PaymentView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PaymentPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> {t('payment')}</title>
      </Helmet>

      <PaymentView />
    </>
  );
}
