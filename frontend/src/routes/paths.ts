// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  TEMP: '/temp',
  EVALUATION: '/evaluation',
  ADMIN: '/admin',
  BOEMNG: '/boe_mng',
  APPROVALWORKFLOW: '/approve',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    overview: `${ROOTS.DASHBOARD}/overview`,
    status_summary: `${ROOTS.DASHBOARD}/status_summary`,
    eval_progress: `${ROOTS.DASHBOARD}/eval_progress`,
  },
  boe_mng: {
    root: ROOTS.BOEMNG,
    data_import: `${ROOTS.BOEMNG}/data_import`,
    wbs_summary: `${ROOTS.BOEMNG}/wbs_summary`,
    task_details: `${ROOTS.BOEMNG}/task_details`,
    boe_gantt: `${ROOTS.BOEMNG}/boe_gantt`,
    boe_pivot: `${ROOTS.BOEMNG}/boe_pivot`,
  },
  approval_workflow: {
    teamLead_assign: `${ROOTS.APPROVALWORKFLOW}/teamLead_assign`,
    task_assign: `${ROOTS.APPROVALWORKFLOW}/task_assign`,
  },
  evalation: {
    tasks: `${ROOTS.EVALUATION}/tasks`,
    scope: `${ROOTS.EVALUATION}/scope`,
    scope1: `${ROOTS.EVALUATION}/scope1`,
    question_flow_task: {
      scope_section: (wbsId: string, taskId: string) =>
        `${ROOTS.EVALUATION}/question_flow/scope_section/${wbsId}/${taskId}`,
    },
  },
  importPDF: {
    root: `${ROOTS.DASHBOARD}/import`,
  },
  scroll: {
    root: `${ROOTS.DASHBOARD}/scroll`,
  },
  admin: {
    root: ROOTS.ADMIN,
    userslist: `${ROOTS.ADMIN}/userslist`,
  },
  temp: {
    home: `${ROOTS.TEMP}/home`,
    assign: `${ROOTS.TEMP}/assign`,
    scope: `${ROOTS.TEMP}/scope`,
    methodology: `${ROOTS.TEMP}/methodology`,
    quntity_of_hours: `${ROOTS.TEMP}/quntity_of_hours`,
    distribution_of_hours: `${ROOTS.TEMP}/distribution_of_hours`,
    labor_costs: `${ROOTS.TEMP}/labor_costs`,
    distribution_of_labor: `${ROOTS.TEMP}/distribution_of_labor`,
    material: `${ROOTS.TEMP}/material`,
    travel: `${ROOTS.TEMP}/travel`,
  },
};
