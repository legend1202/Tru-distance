import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { paths } from '../paths';

// ----------------------------------------------------------------------

// OVERVIEW

const TaskAssignPage = lazy(() => import('src/pages/approval_workflow/task_assign'));
const TeamLeadAssignPage = lazy(() => import('src/pages/approval_workflow/team_lead_assign'));

const ReviewTasksView = lazy(() => import('src/pages/evaluation/review_tasks'));

// ----------------------------------------------------------------------

export const approve_workflow_Routes = [
  {
    path: 'approve',
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
      { element: <TaskAssignPage />, index: true },
      { path: paths.approval_workflow.task_assign, element: <TaskAssignPage /> },
      { path: paths.approval_workflow.teamLead_assign, element: <TeamLeadAssignPage /> },
      { path: paths.approval_workflow.task_review, element: <ReviewTasksView /> },
    ],
  },
];
