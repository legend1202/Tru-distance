export type IflowData = {
  id: string;
  taskId: string; // 0 not start, 1: correct, 2: not correct
  flowData: IflowDataItem[];
};

export type IflowDataItem = {
  type: string;
  status: number; // 0 not start, 1: correct, 2: not correct
  title: string;
  children: IflowDataItemChild[];
};

export type IflowDataItemChild = {
  status1?: number; // 0 not start, 1: correct, 2: not correct
  status2?: number; // 0 not start, 1: correct, 2: not correct
  answer?: number; // Make answer optional
  intro?: string; // Make intro1 optional
  question1: string;
  description1: string;
  question2?: string; // Make question2 optional
  description2?: string; // Make description2 optional
  narrative?: string; // Make narrative optional
  yes1?: number[];
  no1?: number[];
  yes2?: number[]; // Make yes2 optional
  no2?: number[]; // Make no2 optional
  next?: number[];
  prev?: number[];
};
