import { Helmet } from 'react-helmet-async';

import { TaskDetailsView } from 'src/sections/boe_mng/task_details/view';
// ----------------------------------------------------------------------

export default function TaskDetailsPage() {
  return (
    <>
      <Helmet>
        <title> BOE: Task Details</title>
      </Helmet>

      <TaskDetailsView />
    </>
  );
}
