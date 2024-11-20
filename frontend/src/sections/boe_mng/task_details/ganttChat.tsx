import React, { useEffect, useState } from 'react';

import { Table, TableRow, Container, TableBody, TableCell, TableHead } from '@mui/material';

interface Task {
  name: string;
  data: { month: string; value: number; status: string }[];
  subtasks?: Task[];
}

interface GanttChartProps {
  tasks: Task[];
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

  useEffect(() => {
    if (monthFlag) {
      setMonths(calendarMonths);
    } else {
      setMonths(fiscalMonths);
    }
  }, [monthFlag]);
  // Render a single row for a task or subtask
  const renderRow = (task: Task, isSubtask = false) => (
    <TableRow key={task.name}>
      {/* Task or subtask name */}
      <TableCell style={{ paddingLeft: isSubtask ? '20px' : '5px', border: '1px solid #ccc' }}>
        {task.name}
      </TableCell>

      {/* Month cells */}
      {months.map((month) => {
        const data = task.data.find((d) => d.month === month);
        return (
          <TableCell
            key={month}
            style={{
              backgroundColor: data
                ? data.status === 'complete'
                  ? 'green'
                  : 'orange'
                : 'transparent',
              color: data ? '#fff' : '#000',
              textAlign: 'center',
              border: '1px solid #ccc',
            }}
          >
            {data?.value ?? ''}
          </TableCell>
        );
      })}
    </TableRow>
  );

  return (
    <Container
      sx={{
        overflowY: 'auto',
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
            <TableCell style={{ textAlign: 'left', padding: '5px', border: '1px solid #ccc' }}>
              WBS/Task/Sub
            </TableCell>
            {months.map((month) => (
              <TableCell
                key={month}
                style={{ textAlign: 'center', padding: '5px', border: '1px solid #ccc' }}
              >
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <>
              {renderRow(task)}
              {task.subtasks?.map((subtask) => renderRow(subtask, true))}
            </>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default NewGanttChart;
