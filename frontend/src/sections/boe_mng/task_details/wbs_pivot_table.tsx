import React from 'react';

import { Table, TableRow, Container, TableBody, TableCell, TableHead } from '@mui/material';

import { useGetUserLists } from 'src/api/admin';

import { IUserItem } from 'src/types/user';
import { ISubtask, IEvaluationData } from 'src/types/gantt';

interface GanttChartProps {
  tasks: IEvaluationData[];
}

interface RenderRowProps {
  task: IEvaluationData;
  users: IUserItem[];
}

interface RenderSubRowProps {
  task: ISubtask;
  users: IUserItem[];
}

const RenderRow = ({ task, users }: RenderRowProps) => {
  const filteredUser = task.assignedUsers
    ? users.filter((user) => user.id === task.assignedUsers[0])
    : [];
  return (
    <TableRow key={`${task.name}-task`}>
      {/* Add unique key based on task.name */}
      <TableCell
        key={`${task.name}-name`}
        style={{ paddingLeft: '16px', border: '1px solid #ccc' }}
      >
        {task.name}
      </TableCell>
      <TableCell
        key={`${task.name}-evaluator`}
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        {filteredUser[0]?.name || ''}
      </TableCell>
      <TableCell
        key={`${task.name}-status`}
        style={{
          backgroundColor:
            // eslint-disable-next-line no-nested-ternary
            task.status === 2 ? 'green' : task.status === 1 ? 'orange' : 'transparent',
          color: '#fff',
          textAlign: 'center',
          border: '1px solid #ccc',
        }}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {task.status === 2 ? (task.status === 1 ? 'Partially' : 'Completed') : 'Not Yet'}
      </TableCell>
      <TableCell
        key={`${task.name}-tbd`}
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        TBD
      </TableCell>
    </TableRow>
  );
};

const RenderSubRow = ({ task, users }: RenderSubRowProps) => {
  const filteredUser = task.assignedUsers
    ? users.filter((user) => user.id === task.assignedUsers[0])
    : [];
  return (
    <TableRow key={`${task.name}-subtask`}>
      <TableCell
        key={`${task.name}-subname`}
        style={{ paddingLeft: '36px', border: '1px solid #ccc' }}
      >
        {task.name}
      </TableCell>
      <TableCell
        key={`${task.name}-subevaluator`}
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        {filteredUser[0]?.name || ''}
      </TableCell>
      <TableCell
        key={`${task.name}-substatus`}
        style={{
          // eslint-disable-next-line no-nested-ternary
          backgroundColor:
            // eslint-disable-next-line no-nested-ternary
            task.status === 2 ? 'green' : task.status === 1 ? 'orange' : 'transparent',
          color: '#fff',
          textAlign: 'center',
          border: '1px solid #ccc',
        }}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {task.status === 2 ? (task.status === 1 ? 'Partially' : 'Completed') : 'Not Yet'}
      </TableCell>
      <TableCell
        key={`${task.name}-subtbd`}
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        TBD
      </TableCell>
    </TableRow>
  );
};

const WbsPivotTable: React.FC<GanttChartProps> = ({ tasks }) => {
  const headers = ['Evaluator', 'Status', 'TBD'];
  const { users = [] } = useGetUserLists(); // Ensure users is at least an empty array.

  return (
    <Container sx={{ overflowY: 'auto' }}>
      <Table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
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
            <React.Fragment key={task.name}>
              <RenderRow task={task} users={users} />
              {task.subtasks?.map((subtask) => (
                <RenderSubRow key={`${task.name}-${subtask.name}`} task={subtask} users={users} />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default WbsPivotTable;
