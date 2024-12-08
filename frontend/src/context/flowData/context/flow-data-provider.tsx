import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { flowData } from 'src/utils/evaluation-flow';

import { IflowDataItem } from 'src/types/flowData';

import { FlowdataStateType } from '../types';
import { FlowDataContext } from './flow-data-context';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  UPDATE = 'UPDATE',
}

type ActionsType = {
  type: string;
  payload: FlowdataStateType;
};

const initialState: FlowdataStateType = {
  flowData,
};

const reducer = (state: FlowdataStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      flowData: action.payload.flowData,
    };
  }
  if (action.type === Types.UPDATE) {
    return {
      flowData: action.payload.flowData,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function FlowDataProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    dispatch({
      type: Types.INITIAL,
      payload: {
        flowData,
      },
    });
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // REGISTER
  const setFlowData = useCallback(async (data: IflowDataItem[]) => {
    dispatch({
      type: Types.UPDATE,
      payload: {
        flowData: data,
      },
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      flowData: state.flowData,
      setFlowData,
    }),
    [state.flowData, setFlowData]
  );

  return <FlowDataContext.Provider value={memoizedValue}>{children}</FlowDataContext.Provider>;
}
