import { Helmet } from 'react-helmet-async';

import { SummaryView } from 'src/sections/dashboard/summary/view';
// ----------------------------------------------------------------------

export default function SummaryPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Summary</title>
      </Helmet>

      <SummaryView />
    </>
  );
}
