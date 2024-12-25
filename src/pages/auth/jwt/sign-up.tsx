import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SignUpView } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Sign up</title>
      </Helmet>

      <SignUpView />
    </>
  );
}
