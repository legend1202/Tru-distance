import React, { useState, useEffect } from 'react';

import { Table, Button, TableRow, Container, TableBody, TableCell, TableHead } from '@mui/material';

import { ISubtask, IEvaluationData } from 'src/types/gantt';

interface GanttChartProps {
  tasks: IEvaluationData[];
  monthFlag: boolean;
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

const fiscalMonths = [
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
];

const NewGanttChart: React.FC<GanttChartProps> = ({ tasks, monthFlag }) => {
  const [months, setMonths] = useState<string[]>(calendarMonths);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (monthFlag) {
      setMonths(calendarMonths);
    } else {
      setMonths(fiscalMonths);
    }
  }, [monthFlag]);

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
  const renderSubRow = (task: ISubtask): any => (
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
          const data = Number(task.hours) / 12;

          // month hour detect
          // if (task.month) {
          //   data = task?.month.find((d) => d === month) || 0;
          // }
          return (
            <TableCell
              key={`${task.name}-${month}`}
              style={{
                // eslint-disable-next-line no-nested-ternary
                backgroundColor: !data ? 'transparent' : 'green',
                color: '#fff',
                textAlign: 'center',
                border: '1px solid #ccc',
              }}
            >
              {!data ? '' : data.toFixed(0)}
            </TableCell>
          );
        })}
      </TableRow>
    </React.Fragment>
  );

  const renderRow = (task: IEvaluationData, isSubtask = false): any => {
    const isExpanded = expandedTasks.has(task.name);
    const hasSubtasks = task?.subtasks && task.subtasks.length > 0;

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
          {months.map((month) => {
            const data = task.hours / 12;

            // month hour detect
            // if (task.month) {
            //   data = task?.month.find((d) => d === month) || 0;
            // }
            return (
              <TableCell
                key={`${task.name}-${month}`}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  backgroundColor: !data ? 'transparent' : 'green',
                  color: '#fff',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                }}
              >
                {!data ? '' : data.toFixed(0)}
              </TableCell>
            );
          })}
        </TableRow>

        {/* Render Subtasks if Expanded */}
        {isExpanded && task.subtasks?.map((subtask) => renderSubRow(subtask))}
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
            {months.map((month) => (
              <TableCell
                key={month}
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
