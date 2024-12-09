import { Helmet } from 'react-helmet-async';

import { AssignedTasksView } from 'src/sections/evaluation/tasks/view';

// ----------------------------------------------------------------------

export default function AssignedTasksPage() {
  return (
    <>
      <Helmet>
        <title> Assigned Tasks</title>
      </Helmet>

      <AssignedTasksView />
    </>
  );
}
