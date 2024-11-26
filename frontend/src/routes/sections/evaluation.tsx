import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { paths } from '../paths';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

const EvaluationScope = lazy(() => import('src/pages/evaluation/scope'));

const AssignedTasksView = lazy(() => import('src/pages/evaluation/tasks'));

// const EvaluationScope1 = lazy(() => import('src/pages/evaluation/scope1'));

// ----------------------------------------------------------------------

export const evaluationRoutes = [
  {
    path: 'evaluation',
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
      { path: paths.evalation.tasks, element: <AssignedTasksView /> },
      { path: paths.evalation.scope, element: <EvaluationScope /> },
    ],
  },
];