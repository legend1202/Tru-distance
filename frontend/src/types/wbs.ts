export type ISubtask = {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number | 0;
  cost: number | 0;
  checked?: boolean | undefined;
};

export type ITask = {
  checked?: boolean | undefined;
  id: string;
  wbsId: string;
  name: string;
  taskCode: string;
  periodOfPerformance: {
    start: Date;
    end: Date;
  };
  description: string;
  hours: number | 0;
  cost: number | 0;
  subtasks: ISubtask[];
};

export type IWbs = {
  id: string;
  boeId: string;
  title: string;
  wbsCode: string;
  tasks: ITask[]; // Add tasks array
  createdAt: Date;
  updateAt: Date;
};
