import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { paths } from '../paths';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

const SummaryPage = lazy(() => import('src/pages/dashboard/summary'));
const EvalProgressPage = lazy(() => import('src/pages/dashboard/eval-progress'));

const ScrollPDF = lazy(() => import('src/pages/dashboard/scrollPDF'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: paths.dashboard.status_summary, element: <SummaryPage /> },
      { path: paths.dashboard.eval_progress, element: <EvalProgressPage /> },
      { path: paths.scroll.root, element: <ScrollPDF /> },
    ],
  },
];
