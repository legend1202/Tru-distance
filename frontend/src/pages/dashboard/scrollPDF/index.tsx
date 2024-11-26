import { Helmet } from 'react-helmet-async';

import { ScrolUIView } from 'src/sections/dashboard/scrollUIView';

// ----------------------------------------------------------------------

export default function ProcessPDF() {
  return (
    <>
      <Helmet>
        <title> Scroll UI</title>
      </Helmet>

      <ScrolUIView />
    </>
  );
}
