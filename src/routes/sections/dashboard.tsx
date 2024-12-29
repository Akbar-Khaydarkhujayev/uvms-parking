import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const CompanyPage = lazy(() => import('src/pages/dashboard/company'));
const DashboardPage = lazy(() => import('src/pages/dashboard/dashboard'));
const MonitoringPage = lazy(() => import('src/pages/dashboard/monitoring'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: '',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <DashboardPage />, index: true },
      { path: 'companies', element: <CompanyPage /> },
      { path: 'monitoring', element: <MonitoringPage /> },
    ],
  },
];
