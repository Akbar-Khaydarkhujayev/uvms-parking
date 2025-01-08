import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

import { AuthCenteredLayout } from 'src/layouts/auth-centered';

// ----------------------------------------------------------------------

const PaymentPage = lazy(() => import('src/pages/user/payment'));
const SignUpPage = lazy(() => import('src/pages/auth/jwt/sign-up'));

const payment = [
  {
    path: 'payment',
    element: (
      <GuestGuard>
        <AuthCenteredLayout>
          <PaymentPage />
        </AuthCenteredLayout>
      </GuestGuard>
    ),
  },
  {
    path: 'payment/:id',
    element: <GuestGuard>HELLO WORLD PAY</GuestGuard>,
  },
];

// ----------------------------------------------------------------------

export const userRoutes = [
  {
    path: 'user',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: payment,
  },
];
