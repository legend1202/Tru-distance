import { Helmet } from 'react-helmet-async';

import { BoeImportView } from 'src/sections/boe_mng/data_import/view';
// ----------------------------------------------------------------------

export default function DataImportPage() {
  return (
    <>
      <Helmet>
        <title> BOE: Data Import</title>
      </Helmet>

      <BoeImportView />
    </>
  );
}
