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

const EvaluationQuestionFlowScopeSectionPage = lazy(
  () => import('src/pages/evaluation/question-flow/scope-section')
);

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
      {
        path: 'question_flow/scope_section/:wbsId',
        element: <EvaluationQuestionFlowScopeSectionPage />,
      },
    ],
  },
];
