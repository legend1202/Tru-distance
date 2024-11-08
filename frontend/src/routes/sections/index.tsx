import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { adminRoutes } from './admin';
import { beo_mng_Routes } from './boe_mng';
import { dashboardRoutes } from './dashboard';
import { approve_workflow_Routes } from './approval_workflow';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH HOME PAGE

    // Auth routes
    ...authRoutes,

    // Main routes
    ...mainRoutes,

    ...dashboardRoutes,

    ...adminRoutes,

    ...beo_mng_Routes,

    ...approve_workflow_Routes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
