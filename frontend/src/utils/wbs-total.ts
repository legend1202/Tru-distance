import { IWbs } from 'src/types/wbs';
import { ITask } from 'src/types/task';

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

export const calculateTotals = (wbs: IWbs[]) => {
  let totalHours = 0;
  let totalCost = 0;
  let totalTravel = 0;
  let totalMaterial = 0;

  wbs.forEach((wbsData) => {
    wbsData.tasks.forEach((element) => {
      if (element.hours) totalHours += Number(element.hours);
      if (element.cost) totalCost += Number(element.cost);
      if (element.travel) totalTravel += Number(element.travel);
      if (element.material) totalMaterial += Number(element.material);
    });
    // Add task hours and cost if they are not null
  });

  return { totalHours, totalCost, totalTravel, totalMaterial };
};

export const calculateClinTotals = (wbs: IWbs[], clinId: string) => {
  let totalHours = 0;

  wbs.forEach((wbsData) => {
    wbsData.tasks.forEach((element) => {
      if (element.hours && element.clinId === clinId) totalHours += Number(element.hours);
    });
    // Add task hours and cost if they are not null
  });

  return totalHours;
};

export const calculatePivotTotals = (tasks: ITask[]) => {
  let totalHours = 0;
  let totalCost = 0;
  let totalTravel = 0;
  let totalMaterial = 0;

  tasks.forEach((element) => {
    if (element.hours) totalHours += Number(element.hours);
    if (element.cost) totalCost += Number(element.cost);
    if (element.travel) totalTravel += Number(element.travel);
    if (element.material) totalMaterial += Number(element.material);
  });

  return { totalHours, totalCost, totalTravel, totalMaterial };
};
