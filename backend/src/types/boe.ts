interface PeriodOfPerformance {
  start: string | null;
  end: string | null;
}

interface BoeData {
  name: string;
  title: string;
  proposalName: string;
  createdBy: string;
  periodOfPerformance: PeriodOfPerformance;
  description: string;
}

interface Task {
  taskCode: string;
  name: string;
  periodOfPerformance: PeriodOfPerformance;
  description: string;
  hours: number | null;
  cost: number | null;
  subtasks: Subtask[];
}

interface Subtask {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number | null;
  cost: number | null;
}

interface WbsData {
  title: string | null;
  wbsCode: string | null;
  tasks: Array<{
    taskCode: string;
    name: string;
    periodOfPerformance: PeriodOfPerformance;
  }>;
}
