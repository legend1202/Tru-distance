import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  home: icon('ic_home'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  gravestone: icon('ic_gravestone'),
  graveyard: icon('ic_graveyard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // Dashboard
      // ADMIN' | 'Lead' | 'Tech' | 'Material' | 'Travel' | 'Cost';
      // {
      //   subheader: t('Dashbaord'),
      //   roles: ['ADMIN', 'Lead', 'Tech', 'Material', 'Travel'],
      //   items: [
      //     {
      //       title: t('Overview'),
      //       path: paths.dashboard.root,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead', 'Tech'],
      //     },
      //     {
      //       title: t('Assigned Tasks'),
      //       path: paths.dashboard.status_summary,
      //       icon: ICONS.dashboard,
      //       roles: ['Tech', 'Material', 'Travel'],
      //     },
      //     {
      //       title: t('Status Summary'),
      //       path: paths.dashboard.status_summary,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead', 'Tech', 'Material', 'Travel'],
      //     },
      //     {
      //       title: t('Evaluation Progress'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead'],
      //     },
      //   ],
      // },
      {
        subheader: t('BOE Management'),
        roles: ['ADMIN', 'Lead'],
        items: [
          {
            title: t('Data Import'),
            path: paths.boe_mng.data_import,
            icon: ICONS.job,
            roles: ['ADMIN', 'Lead'],
          },
          {
            title: t('File List'),
            path: paths.boe_mng.file_list,
            icon: ICONS.dashboard,
            roles: ['ADMIN', 'Lead'],
          },
          {
            title: t('WBS Summary'),
            path: paths.boe_mng.wbs_summary,
            icon: ICONS.dashboard,
            roles: ['ADMIN', 'Lead'],
          },
          {
            title: t('Task Details'),
            path: paths.boe_mng.boe_gantt,
            icon: ICONS.dashboard,
            roles: ['ADMIN', 'Lead'],
          },
        ],
      },
      {
        subheader: t('Evaluation Process'),
        roles: ['Tech', 'Material', 'Travel', 'Cost'],
        items: [
          {
            title: t('Assigned Tasks'),
            path: paths.evalation.tasks,
            icon: ICONS.external,
            roles: ['Tech', 'Material', 'Travel', 'Cost'],
          },
        ],
      },
      {
        subheader: t('Approval Workflow'),
        roles: ['ADMIN', 'Lead'],
        items: [
          {
            title: t('User Management'),
            path: paths.admin.userslist,
            icon: ICONS.user,
            roles: ['ADMIN'],
          },
          {
            title: t('Team Lead Assignment'),
            path: paths.approval_workflow.teamLead_assign,
            icon: ICONS.dashboard,
            roles: ['ADMIN'],
          },

          {
            title: t('Evaluation Team Assignment'),
            path: paths.approval_workflow.task_assign,
            icon: ICONS.dashboard,
            roles: ['Lead'],
          },
          {
            title: t('Assessment Review'),
            path: paths.approval_workflow.task_review,
            icon: ICONS.dashboard,
            roles: ['Lead'],
          },
          // {
          //   title: t('Assessment Approval'),
          //   path: paths.dashboard.status_summary,
          //   icon: ICONS.dashboard,
          //   roles: ['ADMIN', 'Lead'],
          // },
          // {
          //   title: t('Consolidation and Roll-Up'),
          //   path: paths.dashboard.eval_progress,
          //   icon: ICONS.dashboard,
          //   roles: ['ADMIN', 'Lead'],
          // },
        ],
      },
      // {
      //   subheader: t('Reports'),
      //   roles: ['ADMIN', 'Lead', 'Tech', 'Material'],
      //   items: [
      //     {
      //       title: t('Proposal Reports'),
      //       path: paths.dashboard.root,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead'],
      //     },
      //     {
      //       title: t('Cost and Hours Distribution'),
      //       path: paths.dashboard.status_summary,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //     {
      //       title: t('GANNT Chart'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead'],
      //     },
      //     {
      //       title: t('Labor Category Breakdown'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //     {
      //       title: t('Task Hours Summary'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['Lead'],
      //     },
      //     {
      //       title: t('Task-Level Reports'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['Tech'],
      //     },
      //     {
      //       title: t('Summary Reports'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['Tech'],
      //     },
      //     {
      //       title: t('Cost Evaluation (Material Cost Analysis)'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['Material'],
      //     },
      //     {
      //       title: t('Travel Cost Summary'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['Travel'],
      //     },
      //   ],
      // },
      // {
      //   subheader: t('Metrics and Analytics'),
      //   roles: ['ADMIN'],
      //   items: [
      //     {
      //       title: t('Complexity and Risk Factors'),
      //       path: paths.dashboard.root,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //     {
      //       title: t('Skill Mix and Resource Analysis'),
      //       path: paths.dashboard.status_summary,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //     {
      //       title: t('Historical Data Comparison'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //   ],
      // },
      // {
      //   subheader: t('Admin Settings'),
      //   roles: ['ADMIN'],
      //   items: [

      //     {
      //       title: t('Roles and Permissions'),
      //       path: paths.dashboard.status_summary,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //     {
      //       title: t('Settings and Configurations'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN'],
      //     },
      //   ],
      // },
      // {
      //   subheader: t('Help & Documentation'),
      //   roles: ['ADMIN', 'Lead', 'Tech', 'Material', 'Travel'],
      //   items: [
      //     {
      //       title: t('User Guide'),
      //       path: paths.dashboard.root,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead', 'Tech', 'Material', 'Travel'],
      //     },
      //     {
      //       title: t('FAQs'),
      //       path: paths.dashboard.status_summary,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead', 'Tech', 'Material', 'Travel'],
      //     },
      //     {
      //       title: t('Contact Support'),
      //       path: paths.dashboard.eval_progress,
      //       icon: ICONS.dashboard,
      //       roles: ['ADMIN', 'Lead', 'Tech'],
      //     },
      //   ],
      // },
      /* {
        subheader: t('Home'),
        roles: ['COST', 'ADMIN'],
        items: [
          {
            title: t('Home'),
            path: paths.importPDF.root,
            icon: ICONS.dashboard,
            roles: ['COST', 'ADMIN'],
          },
          {
            title: t('scrol UI'),
            path: paths.scroll.root,
            icon: ICONS.dashboard,
            roles: ['COST', 'ADMIN'],
          },
        ],
      },
      {
        subheader: t('Scope'),
        roles: ['COST', 'ADMIN'],
        color: '#ee575e',
        items: [
        ],
      },
      {
        subheader: t('Methodology'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [
        ],
      },
      {
        subheader: t('Quantity of Hours'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Distribution of Hours'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Labor Costs'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Distruciton of Labor'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Material'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Travel'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Admin'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      }, */
    ],
    [t]
  );

  return data;
}
