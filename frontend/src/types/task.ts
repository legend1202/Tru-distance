import { IProposal } from './proposal';
import { IPeriodOfPerformance } from './flowData';

export type ITempTask = {
  id: string;
  wbsId: string;
  name: string;
  taskCode: string;
  description: string;
  assignedEvaluators: string;
  periodOfPerformance: {
    start: Date;
    end: Date;
  };
  methodOfQuoting: {
    historicalProgramName: string;
    contractNumber: string;
    periodOfPerformanceMonths: number;
    totalHours: number;
  };
  methodology: string;
  hoursDistribution: {
    yearly: number;
    monthly: number[];
  };
  costDistribution: {
    yearly: number;
    monthly: number[];
  };
  evaluation: {
    scope: string;
    methodologyReview: string;
    riskComplexity: string;
    costAnalysis: string;
    recommendation: string;
    status: string;
  };
  createdAt: Date;
  updateAt: Date;
};

export type IApproveTask = {
  id?: string;
  wbsId: string;
  userId: string;
  tasks: IProposal[];
};

export interface ISpreadTotals {
  hours_by_month: {
    [year: string]: number[];
  };
}

type IWbs = {
  id: string;
  proposalId: string;
  wbsTitle: string;
  wbsNumber: string;
  createdAt: Date;
  updateAt: Date;
};

export type ITask = {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  name: string;
  taskCode: string;
  description: string;
  hours: number;
  periodOfPerformance: IPeriodOfPerformance;
  cost: number;
  material: number;
  travel: number;
  subtasks: ITask[];
  spread_totals?: any;
  clinDetails: {
    clinNumber: string;
    clinTitle: string;
  };
  assignedUsers: String[];
  status: Number;
  wbsDetails?: IWbs[];
};

export type ISubtask = {
  data: any;
  subtaskCode: string;
  name: string;
  description: string;
  periodOfPerformance: IPeriodOfPerformance;
  hours: number;
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
