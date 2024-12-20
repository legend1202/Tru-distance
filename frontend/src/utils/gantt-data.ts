import { IWbs } from 'src/types/wbs';
import { IGanttWbsItem, IGanttTaskItem } from 'src/types/gantt';

// Function to filter hours by the monthFlag
function filterHoursByMonth(
  hoursByMonth: { [year: string]: number[] },
  monthFlag: boolean
): number[] {
  // Dynamically determine currentYear and lastYear based on the keys in hoursByMonth
  const years = Object.keys(hoursByMonth)
    .map(Number)
    .sort((a, b) => b - a); // Sort years descending
  const currentYear = years[0]; // Top year in the data
  const lastYear = years[1]; // Previous year in the data (if exists)

  if (monthFlag) {
    // From January to December of the current year
    return Array.from({ length: 12 }, (_, i) => hoursByMonth[currentYear]?.[i] || 0);
  }
  // From October of last year to September of the current year
  return [
    ...(hoursByMonth[lastYear]?.slice(9, 12) || [0, 0, 0]), // Last year's Oct, Nov, Dec
    ...(hoursByMonth[currentYear]?.slice(0, 9) || Array(9).fill(0)), // Current year's Jan to Sep
  ];
}

// Function to transform the JSON data into IGanttWbsItem[]
export function transformData(data: IWbs[], monthFlag: boolean): IGanttWbsItem[] {
  return data.map((wbsItem) => {
    const wbsHoursByMonth = wbsItem.tasks.reduce<{ [year: string]: number[] }>((acc, task) => {
      Object.entries(task.spread_totals.hours_by_month).forEach(([year, monthlyHours]) => {
        if (!acc[year]) acc[year] = [];
        (monthlyHours as number[]).forEach((hours: number, monthIndex: number) => {
          acc[year][monthIndex] = (acc[year][monthIndex] || 0) + hours;
        });
      });
      return acc;
    }, {});

    const tasks: IGanttTaskItem[] = wbsItem.tasks.map((task, taskIndex) => {
      const taskHours = filterHoursByMonth(task.spread_totals.hours_by_month, monthFlag);
      const taskTotal = taskHours.reduce((sum, hour) => sum + hour, 0);
      return {
        id: `${wbsItem.wbsNumber}-${taskIndex}`,
        name: task.name,
        hours: taskHours,
        total: taskTotal,
      };
    });

    const wbsHours = filterHoursByMonth(wbsHoursByMonth, monthFlag);
    const wbsTotal = wbsHours.reduce((sum, hour) => sum + hour, 0);

    return {
      id: wbsItem.wbsNumber,
      name: wbsItem.wbsTitle,
      hours: wbsHours,
      total: wbsTotal,
      tasks,
    };
  });
}
