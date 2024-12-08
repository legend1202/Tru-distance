import { useContext } from 'react';

import { FlowDataContext } from '../context/flow-data-context';

// ----------------------------------------------------------------------

export const useFlowDataContext = () => {
  const context = useContext(FlowDataContext);

  if (!context) throw new Error('useFlowDataContext context must be use inside FlowDataProvider');

  return context;
};
