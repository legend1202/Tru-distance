import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { EvaluationQuestionFlowScopeSectionView } from 'src/sections/evaluation/questionFlow/scope-section/view';

// ----------------------------------------------------------------------

export default function EvaluationQuestionFlowScopeSectionPage() {
  const params = useParams();

  const { wbsId, taskId } = params;
  return (
    <>
      <Helmet>
        <title> Evaluation Scope Section</title>
      </Helmet>

      <EvaluationQuestionFlowScopeSectionView wbsId={wbsId || ''} taskId={taskId || ''} />
    </>
  );
}
