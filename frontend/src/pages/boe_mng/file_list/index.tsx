import { Helmet } from 'react-helmet-async';

import { FileListView } from 'src/sections/boe_mng/file_list/view';
// ----------------------------------------------------------------------

export default function FileListPage() {
  return (
    <>
      <Helmet>
        <title> BOE: File List</title>
      </Helmet>

      <FileListView />
    </>
  );
}
