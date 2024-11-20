import React from 'react';

import { Table, TableRow, Container, TableBody, TableCell, TableHead } from '@mui/material';

interface Task {
  name: string;
  data: { Evaluator: string; TBD: string; status: string };
  subtasks?: Task[];
}

interface GanttChartProps {
  tasks: Task[];
}

const WbsPivotTable: React.FC<GanttChartProps> = ({ tasks }) => {
  const headers = ['Evaluator', 'status', 'TBD'];

  // Render a single row for a task or subtask

  const renderRow = (task: Task, isSubtask = false) => (
    <TableRow key={task.name}>
      {/* Task or subtask name */}
      <TableCell
        key="name"
        style={{ paddingLeft: isSubtask ? '20px' : '5px', border: '1px solid #ccc' }}
      >
        {task.name}
      </TableCell>
      <TableCell
        key="Evaluator"
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        {task.data.Evaluator}
      </TableCell>

      <TableCell
        key="status"
        style={{
          backgroundColor: task.data
            ? task.data.status === 'complete'
              ? 'green'
              : 'orange'
            : 'transparent',
          color: '#fff',
          textAlign: 'center',
          border: '1px solid #ccc',
        }}
      >
        {task.data?.status ?? ''}
      </TableCell>
      <TableCell key="TBD" style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}>
        {task.data.TBD}
      </TableCell>
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
            {headers.map((header) => (
              <TableCell
                key={header}
                style={{ textAlign: 'center', padding: '5px', border: '1px solid #ccc' }}
              >
                {header}
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

export default WbsPivotTable;
