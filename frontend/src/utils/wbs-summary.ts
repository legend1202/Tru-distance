import { IWbs, IWbsSummary } from 'src/types/wbs';

// Helper function to generate monthly distribution between two dates
const generateMonthlyDistribution = (start: Date, end: Date) => {
  const monthlyDistribution = [];
  const current = new Date(start);

  while (current <= new Date(end)) {
    monthlyDistribution.push({
      month: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`,
      hours: 0, // Placeholder for actual hours if available
      cost: 0, // Placeholder for actual cost if available
    });
    current.setMonth(current.getMonth() + 1);
  }
  return monthlyDistribution;
};

export const wbsSummaryFunc = (wbs: IWbs): IWbsSummary[] => {
  // Processing each task
  let count = 0;
  const tasksData = [] as IWbsSummary[];
  wbs.tasks.forEach((task) => {
    const { start } = task.periodOfPerformance;
    const { end } = task.periodOfPerformance;
    const monthlyDistribution = generateMonthlyDistribution(start, end);

    const totalHours = monthlyDistribution.reduce((acc, item) => acc + item.hours, 0);
    const totalCost = monthlyDistribution.reduce((acc, item) => acc + item.cost, 0);
    tasksData.push({
      monthlyDistribution,
      id: count,
      taskName: task.name,
      description: task.description,
      startDate: start,
      endDate: end,
      totalHours,
      totalCost,
    });
    count += 1;
  });
  /* const tasksData = wbs.tasks.map((task): IWbsSummary => {
    
  }); */
  return tasksData;
};
