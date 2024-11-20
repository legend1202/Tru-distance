import { Helmet } from 'react-helmet-async';

import { BoePivotView } from 'src/sections/boe_mng/task_details/view';
// ----------------------------------------------------------------------

export default function BoePivotPage() {
  return (
    <>
      <Helmet>
        <title> BOE: Pivot</title>
      </Helmet>

      <BoePivotView />
    </>
  );
}
