import { ITask } from './wbs';

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
  tasks: ITask[];
};
