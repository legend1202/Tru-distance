import { useContext } from 'react';

import { GlobalDataContext, GlobalDataContextType } from './global-data-provider';

export const useGlobalData = (): GlobalDataContextType => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};
