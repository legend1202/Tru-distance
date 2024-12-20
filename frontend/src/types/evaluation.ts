import { ITask } from './task';

export type ITotalTaskDataByEvaluator = {
  id: string;
  proposalId: string;
  wbsNumber: string;
  wbsTitle: string;
  tasks: ITask[];
  createdAt: Date;
  updateAt: Date;
};
