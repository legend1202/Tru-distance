type IWbs = {
  id: string;
  boeId: string;
  wbsTitle: string;
  wbsCode: string;
  createdAt: Date;
  updateAt: Date;
};

export type ISubtask = {
  data: any;
  subtaskCode: string;
  name: string;
  description: string;
  hours: string;
  hoursDesc: string;
  cost: string;
  costdesc: string;
  material: string;
  materialDesc: string;
  travel: string;
  travelDesc: string;
  assignedUsers: String[];
  status: Number;
};

export type IGanttData = {
  originData: IOriginData[];
  evaluationData: IEvaluationData[];
};

export type IOriginData = {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  name: string;
  taskCode: string;
  description: string;
  hours: number;
  cost: number;
  material: number;
  travel: number;
  subtasks: ISubtask[];
  month?: number[];
  clinDetails: {
    clinNumber: string;
    clinTitle: string;
  };
  wbsDetails: {
    wbsNumber: string;
    wbsTitle: string;
  };
};

export type IEvaluationData = {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  name: string;
  taskCode: string;
  description: string;
  hours: number;
  cost: number;
  material: number;
  travel: number;
  month?: number[];
  subtasks: ISubtask[];
  clinDetails: {
    clinNumber: string;
    clinTitle: string;
  };
  wbsDetails: IWbs[];
  assignedUsers: String[];
  status: Number;
};
