import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { EvaluationQuestionFlowView } from 'src/sections/evaluation/questionFlow';
// ----------------------------------------------------------------------

export default function EvaluationQuestionFlowPage() {
  const params = useParams();

  const { wbsId, taskId, subTaskIndex } = params;
  return (
    <>
      <Helmet>
        <title> Evaluation Scope Section</title>
      </Helmet>

      <EvaluationQuestionFlowView
        wbsId={wbsId || ''}
        taskId={taskId || ''}
        subTaskIndex={Number(subTaskIndex)}
      />
    </>
  );
}
