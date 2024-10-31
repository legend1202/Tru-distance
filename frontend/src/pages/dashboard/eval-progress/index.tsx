import { Helmet } from 'react-helmet-async';

/* import { OverviewAppView } from 'src/sections/dashboard/overview/app/view'; */
import { OverviewEcommerceView } from 'src/sections/dashboard/overview/view';
// ----------------------------------------------------------------------

export default function EvalProgressPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Eval Progress</title>
      </Helmet>

      <OverviewEcommerceView />
    </>
  );
}
