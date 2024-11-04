import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import React, { useRef, useEffect } from 'react';

import { ITask, ISubtask } from 'src/types/wbs';

const formatDate = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

interface GanttWithCurrentTimeProps {
  tasksDataT: ITask[];
}

const GanttWithCurrentTime = ({ tasksDataT }: GanttWithCurrentTimeProps) => {
  const ganttContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gantt.config.scale_unit = 'month';
    gantt.config.date_scale = '%m';
    gantt.config.subscales = [];
    gantt.config.open_tree_initially = true;

    gantt.config.columns = [
      { name: 'text', label: 'Task Name', width: '*', tree: true },
      { name: 'hours', label: 'Hours', width: 80, align: 'center' },
      { name: 'cost', label: 'Cost', width: 100, align: 'center' },
    ];

    gantt.templates.task_text = (start: Date, end: Date, task: { text: string }) => task.text;

    gantt.init(ganttContainerRef.current!);

    // Flatten tasks and subtasks into a single array with parent-child relationships
    const tasks = tasksDataT.flatMap((task) => {
      const mainTask = {
        id: task.taskCode,
        text: task.name,
        start_date: formatDate(task.periodOfPerformance.start),
        end_date: formatDate(task.periodOfPerformance.end),
        hours: task.hours || 0,
        cost: task.cost || 0,
        open: true,
      };

      const subtasks = task.subtasks.map((subtask: ISubtask) => ({
        id: `${task.taskCode}-${subtask.subtaskCode}`,
        text: subtask.name,
        start_date: formatDate(task.periodOfPerformance.start),
        end_date: formatDate(task.periodOfPerformance.end),
        hours: subtask.hours || 0,
        cost: subtask.cost || 0,
        parent: task.taskCode, // Link to main task
      }));

      return [mainTask, ...subtasks];
    });

    gantt.clearAll();
    gantt.parse({ data: tasks });

    return () => {
      gantt.clearAll();
    };
  }, [tasksDataT]);

  return <div ref={ganttContainerRef} style={{ width: '100%', height: '600px' }} />;
};

export default GanttWithCurrentTime;
