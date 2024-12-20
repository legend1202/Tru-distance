import { ITask } from './task';

export type IWbs = {
  status: number;
  eveluatorName: string;
  _id: string;
  boeId: string;
  wbsTitle: string;
  wbsNumber: string;
  tasks: ITask[];
  createdAt: Date;
  updateAt: Date;
};

export type IWbsTask = {
  id: string;
  name: string;
  hours: number;
  cost: number;
  status: number;
};
