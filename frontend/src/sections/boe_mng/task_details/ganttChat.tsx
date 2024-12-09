import React, { useState, useEffect } from 'react';

import { Table, Button, TableRow, Container, TableBody, TableCell, TableHead } from '@mui/material';

import { generateMonthList, generateMonthListFromDates } from 'src/utils/month-array';

import { IPeriodOfPerformance } from 'src/types/flowData';
import { ISubtask, IEvaluationData } from 'src/types/gantt';

interface GanttChartProps {
  tasks: IEvaluationData[];
  monthFlag: boolean;
  workPeriod?: IPeriodOfPerformance;
}

const calendarMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// const fiscalMonths = [
//   'Oct',
//   'Nov',
//   'Dec',
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
// ];

const NewGanttChart: React.FC<GanttChartProps> = ({ tasks, monthFlag, workPeriod }) => {
  const [months, setMonths] = useState<string[]>(calendarMonths);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (workPeriod) {
      const monthList = generateMonthList(workPeriod?.start, workPeriod?.end);
      if (monthFlag) {
        // setMonths(calendarMonths);
        setMonths(monthList);
      } else {
        // setMonths(fiscalMonths);
        setMonths(monthList);
      }
    }
  }, [monthFlag, workPeriod]);

  // Toggle expand/collapse for a task
  const toggleTask = (taskName: string) => {
    setExpandedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskName)) {
        newSet.delete(taskName); // Collapse
      } else {
        newSet.add(taskName); // Expand
      }
      return newSet;
    });
  };

  // Render a single row for a task or subtask
  const renderSubRow = (task: ISubtask, taskMonths: string[]): any => {
    const taskMonthValue = Number(task.hours) / taskMonths.length;
    return (
      <React.Fragment key={task.name}>
        {/* Task Row */}
        <TableRow key={task.name}>
          <TableCell
            style={{
              paddingLeft: '48px',
              border: '1px solid #ccc',
            }}
          >
            {task.name}
          </TableCell>

          {/* Month cells */}
          {months.map((month) => {
            const isValid = taskMonths.includes(month);
            // month hour detect
            // if (task.month) {
            //   data = task?.month.find((d) => d === month) || 0;
            // }
            return (
              <TableCell
                key={`${task.name}-${month}`}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  backgroundColor: isValid && taskMonthValue ? 'green' : 'transparent',
                  color: '#fff',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                }}
              >
                {taskMonthValue && isValid ? taskMonthValue.toFixed(2) : ''}
              </TableCell>
            );
          })}
        </TableRow>
      </React.Fragment>
    );
  };

  const renderRow = (task: IEvaluationData, isSubtask = false): any => {
    const isExpanded = expandedTasks.has(task.name);
    const hasSubtasks = task?.subtasks && task.subtasks.length > 0;

    const taskMonths = generateMonthListFromDates(
      task.periodOfPerformance.start.slice(0, 7),
      task.periodOfPerformance.end.slice(0, 7),
      workPeriod?.start,
      workPeriod?.end
    );
    const taskMonthValue = task.hours / taskMonths.length;

    return (
      <React.Fragment key={task.name}>
        {/* Task Row */}
        <TableRow key={task.name}>
          <TableCell
            style={{
              paddingLeft: isSubtask ? '48px' : '15px',
              border: '1px solid #ccc',
            }}
          >
            {hasSubtasks && (
              <Button
                onClick={() => toggleTask(task.name)}
                style={{
                  marginRight: '10px',
                  cursor: 'pointer',
                  minWidth: '20px',
                }}
              >
                {isExpanded ? '-' : '+'}
              </Button>
            )}
            {task.name}
          </TableCell>

          {/* Month cells */}
          {months.map((month, index) => {
            const isValid = taskMonths.includes(month);

            // month hour detect
            // if (task.month) {
            //   data = task?.month.find((d) => d === month) || 0;
            // }
            return (
              <TableCell
                key={index}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  backgroundColor: taskMonthValue && isValid ? 'green' : 'transparent',
                  color: '#fff',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                }}
              >
                {isValid && taskMonthValue ? taskMonthValue.toFixed(2) : ''}
              </TableCell>
            );
          })}
        </TableRow>

        {/* Render Subtasks if Expanded */}
        {isExpanded && task.subtasks?.map((subtask) => renderSubRow(subtask, taskMonths))}
      </React.Fragment>
    );
  };

  return (
    <Container
      sx={{
        overflowY: 'auto',
        maxHeight: '800px', // Fixed height with scrollbar
      }}
    >
      <Table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                textAlign: 'center',
                padding: '5px',
                border: '1px solid #ccc',
              }}
            >
              WBS/Task/Sub
            </TableCell>
            {months.map((month, index) => (
              <TableCell
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '5px',
                  border: '1px solid #ccc',
                }}
              >
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tasks.map((task) => renderRow(task))}</TableBody>
      </Table>
    </Container>
  );
};

export default NewGanttChart;
