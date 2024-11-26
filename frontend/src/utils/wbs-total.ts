import { IWbs } from "src/types/wbs";

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

export const calculateTotals = (tasks: any[]) => {
  let totalHours = 0;
  let totalCost = 0;
  let totalTravel = 0;
  let totalMaterial = 0;

  tasks.forEach((task) => {
    // Add task hours and cost if they are not null
    if (task.hours) totalHours += task.hours;
    if (task.cost) totalCost += task.cost;
    if (task.travel) totalTravel += task.travel;
    if (task.material) totalMaterial += task.material;
  });

  return { totalHours, totalCost, totalTravel, totalMaterial };
};
