import { IWbs } from './wbs';

export type IGanttData = {
  originData: IWbs[];
  evaluationData: IWbs[];
};

export type IGanttWbsItem = {
  id: string;
  name: string;
  hours: number[];
  total: number;
  tasks: IGanttTaskItem[];
};

export type IGanttTaskItem = {
  id: string;
  name: string;
  hours: number[];
  total: number;
};
