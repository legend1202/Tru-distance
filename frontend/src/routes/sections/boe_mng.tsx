import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { paths } from '../paths';

// ----------------------------------------------------------------------

// OVERVIEW
const DataImportPage = lazy(() => import('src/pages/boe_mng/data_import'));

const WbsSummaryPage = lazy(() => import('src/pages/boe_mng/wbs_summary'));

const TaskDetailsPage = lazy(() => import('src/pages/boe_mng/task_details/boe-gantt'));

const BoePivotPage = lazy(() => import('src/pages/boe_mng/task_details/boe-pivot'));

const FileListPage = lazy(() => import('src/pages/boe_mng/file_list'));
// ----------------------------------------------------------------------

export const beo_mng_Routes = [
  {
    path: 'boe_mng',
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
      { element: <DataImportPage />, index: true },
      { path: paths.boe_mng.data_import, element: <DataImportPage /> },
      { path: paths.boe_mng.file_list, element: <FileListPage /> },
      { path: paths.boe_mng.wbs_summary, element: <WbsSummaryPage /> },
      { path: paths.boe_mng.boe_gantt, element: <TaskDetailsPage /> },
      { path: paths.boe_mng.boe_pivot, element: <BoePivotPage /> },
    ],
  },
];
