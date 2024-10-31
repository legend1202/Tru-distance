import { Helmet } from 'react-helmet-async';

import { WbsSummaryView } from 'src/sections/boe_mng/wbs_summary/view';
// ----------------------------------------------------------------------

export default function DataImportPage() {
  return (
    <>
      <Helmet>
        <title> BOE: WBS Summary</title>
      </Helmet>

      <WbsSummaryView />
    </>
  );
}
