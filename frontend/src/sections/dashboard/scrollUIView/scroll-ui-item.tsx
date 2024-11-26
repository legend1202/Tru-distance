import { useResizable } from 'react-resizable-layout';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import SimpleSplitter from './simple-spliter';

const ScrolUIItem = () => {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: 'y',
    initial: 250,
    min: 150,
    reverse: true,
  });

  return (
    <Box
      display="grid"
      gridTemplateRows="1fr auto"
      height="70vh"
      width="49%"
      bgcolor="background.default"
      color="text.primary"
      fontFamily="monospace"
      overflow="hidden"
    >
      <Box overflow="hidden">
        <Typography variant="body1" p={2}>
          Summary: This web-app will be used to help in the evaluation of contract proposals. The
          tool will provide the ability to support a team lead’s management of the evaluation and
          monitor/status of each evaluator. The team lead will assign Work Breakdown Structure (WBS)
          Sections from a Basis of Estimate Document that includes estimated hours, justification
          for the hours, and work tasks defined. The evaluators will also evaluate material costs
          and complete a pricing analysis. The tool requested as required within this document
          provides workflow management, completion checklisting and status for each WBS section as
          assigned to different evaluators. It also walks the evaluators through the process by
          providing them the necessary information all within a single screen to be able to complete
          the analysis quickly. Lastly, the tool shall utilize the data to be able to provide a
          recommendation to the evaluator and continue to learn and optimize on the ability to
          provide that recommendation.
        </Typography>
      </Box>
      <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
      <Box height={terminalH} overflow="hidden">
        <Typography variant="body1" p={2}>
          Summary: This web-app will be used to help in the evaluation of contract proposals. The
          tool will provide the ability to support a team lead’s management of the evaluation and
          monitor/status of each evaluator. The team lead will assign Work Breakdown Structure (WBS)
          Sections from a Basis of Estimate Document that includes estimated hours, justification
          for the hours, and work tasks defined. The evaluators will also evaluate material costs
          and complete a pricing analysis. The tool requested as required within this document
          provides workflow management, completion checklisting and status for each WBS section as
          assigned to different evaluators. It also walks the evaluators through the process by
          providing them the necessary information all within a single screen to be able to complete
          the analysis quickly. Lastly, the tool shall utilize the data to be able to provide a
          recommendation to the evaluator and continue to learn and optimize on the ability to
          provide that recommendation.
        </Typography>
      </Box>
    </Box>
  );
};

export default ScrolUIItem;
