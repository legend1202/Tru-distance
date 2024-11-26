import { IOriginData } from './gantt';

export type IWbs = {
  id: string;
  boeId: string;
  wbsTitle: string;
  wbsCode: string;
  tasks: IOriginData[];
  createdAt: Date;
  updateAt: Date;
};
