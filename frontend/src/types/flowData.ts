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
  question2?: string; // Make question2 optional
  question3?: string; // Make question2 optional
  question4?: string; // Make question2 optional
  description1: string;
  description2?: string; // Make description2 optional
  description3?: string; // Make description2 optional
  description4?: string; // Make description2 optional
  moveOptions?: IflowDataItemChildMoveOption[];
  selectOptions?: string[];
  factor?: IFactor;
  factorJustification?: IFactorJustification;
  yes1?: number[];
  no1?: number[];
  yes2?: number[]; // Make yes2 optional
  no2?: number[]; // Make no2 optional
  next?: number[];
  prev?: number[];
};

export type IflowDataItemChildMoveOption = {
  title: string;
  next: number[];
};

export type IFactor = {
  complexityValue: string;
  complexityConcur: string;
  complexityNonConcur: string;
  riskValue: string;
  riskConcur: string;
  riskNonConcur: string;
  curveValue: string;
  curveConcur: string;
  curveNonConcur: string;
};

export type IFactorJustification = {
  complexity: string;
  risk: string;
  curve: string;
};
