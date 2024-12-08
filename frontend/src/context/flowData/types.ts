import { IflowDataItem } from "src/types/flowData";

export type FlowdataStateType = {
  flowData: IflowDataItem[];
};

export type FlowDataContextType = {
  flowData: IflowDataItem[];
  setFlowData: (flowData: IflowDataItem[]) => Promise<void>;
};
