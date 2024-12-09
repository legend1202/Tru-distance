import { Helmet } from 'react-helmet-async';

import { ReviewTaskView } from 'src/sections/evaluation/review_task/view';
// ----------------------------------------------------------------------

export default function ReviewTasksPage() {
  return (
    <>
      <Helmet>
        <title> Review Tasks</title>
      </Helmet>

      <ReviewTaskView />
    </>
  );
}
