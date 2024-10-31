import { Helmet } from 'react-helmet-async';

/* import { OverviewAppView } from 'src/sections/dashboard/overview/app/view'; */
import { OverviewEcommerceView } from 'src/sections/dashboard/overview/view';
// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Overview</title>
      </Helmet>

      <OverviewEcommerceView />
    </>
  );
}
