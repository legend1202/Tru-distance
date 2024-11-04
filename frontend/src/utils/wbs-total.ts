import { IWbs } from 'src/types/wbs';

export const calculateWBSTotals = (wbs: IWbs) => {
  let totalHours = 0;
  let totalCost = 0;

  wbs.tasks.forEach((task) => {
    // Add task hours and cost if they are not null
    if (task.hours) totalHours += task.hours;
    if (task.cost) totalCost += task.cost;
  });

  return { totalHours, totalCost };
};
