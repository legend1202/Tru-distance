import { Helmet } from 'react-helmet-async';

import { TaskAssignView } from 'src/sections/approval_workflow/task_assign/view';
// ----------------------------------------------------------------------

export default function TaskAssignPage() {
  return (
    <>
      <Helmet>
        <title> Approval: Task Assign</title>
      </Helmet>

      <TaskAssignView />
    </>
  );
}
