export type ITask = {
  taskCode: string;
  name: string;
  periodOfPerformance: {
    start: Date;
    end: Date;
  };
  description: string;
  methodology: string;
  hoursDistribution: {
    yearly: number | null;
    monthly: number | null;
  };
  costDistribution: {
    yearly: number | null;
    monthly: number | null;
  };
};

export type IWbs = {
  id: string;
  boeId: string;
  title: string;
  wbsCode: string;
  hoursTotal: number;
  dollarsTotal: number;
  resourceSummary: {
    resourceId: string;
    hours: number;
    matSubIWTA: number;
    other: number;
  };
  tasks: ITask[]; // Add tasks array
  createdAt: Date;
  updateAt: Date;
};

export type IMonthlyDistribution = {
  cost: number;
  hours: number;
  month: string;
};
export type IWbsSummary = {
  id: number;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  monthlyDistribution: IMonthlyDistribution[];
  totalHours: number;
  totalCost: number;
};
