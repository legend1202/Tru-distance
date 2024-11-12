import { Helmet } from 'react-helmet-async';

import { EvaluationScopeView } from 'src/sections/evaluation/scope';

// ----------------------------------------------------------------------

export default function EvaluationScope() {
  return (
    <>
      <Helmet>
        <title> Evaluation Scope View</title>
      </Helmet>

      <EvaluationScopeView />
    </>
  );
}
