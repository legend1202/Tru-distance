import { IEvaluationData } from './gantt';

export type ITotalTaskDataByEvaluator = {
  id: string;
  proposalId: string;
  wbsNumber: string;
  wbsTitle: string;
  tasks: IEvaluationData[];
  createdAt: Date;
  updateAt: Date;
};
