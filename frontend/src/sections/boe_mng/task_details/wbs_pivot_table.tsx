import React from 'react';

import { Table, TableRow, Container, TableBody, TableCell, TableHead } from '@mui/material';

import { useGetUserLists } from 'src/api/admin';

import { IWbs } from 'src/types/wbs';
import { ITask } from 'src/types/task';
import { IUserItem } from 'src/types/user';

interface GanttChartProps {
  wbs: IWbs[];
}

interface RenderRowProps {
  taskData: ITask;
  users: IUserItem[];
  index: number;
}

interface RenderWbsRowProps {
  wbsData: IWbs;
}

const RenderRow = ({ taskData, users, index }: RenderRowProps) => {
  const filteredUser = taskData.assignedUsers
    ? users.filter((user) => user.id === taskData.assignedUsers[0])
    : [];
  return (
    <TableRow key={`${taskData.id}-task`}>
      {/* Add unique key based on task.name */}
      <TableCell
        key={`${taskData.name}-name`}
        style={{ paddingLeft: '16px', border: '1px solid #ccc' }}
      >
        {index + 1}. {taskData.name}
      </TableCell>
      <TableCell
        key={`${taskData.name}-evaluator`}
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        {filteredUser[0]?.name || ''}
      </TableCell>
      <TableCell
        key={`${taskData.name}-status`}
        style={{
          backgroundColor:
            // eslint-disable-next-line no-nested-ternary
            taskData.status === 2 ? 'green' : taskData.status === 1 ? 'orange' : 'transparent',
          color: '#fff',
          textAlign: 'center',
          border: '1px solid #ccc',
        }}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {taskData.status === 2 ? (taskData.status === 1 ? 'Partially' : 'Completed') : 'Not Yet'}
      </TableCell>
      <TableCell
        key={`${taskData.name}-tbd`}
        style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
      >
        {taskData.description || ''}
      </TableCell>
    </TableRow>
  );
};

const RenderWbsRow = ({ wbsData }: RenderWbsRowProps) => (
  <TableRow key={`${wbsData.wbsNumber}-task`}>
    {/* Add unique key based on task.name */}
    <TableCell
      key={`${wbsData.wbsTitle}-name`}
      style={{ paddingLeft: '16px', border: '1px solid #ccc', backgroundColor: 'gray' }}
    >
      {wbsData.wbsTitle}
    </TableCell>
    <TableCell
      key={`${wbsData.wbsTitle}-evaluator`}
      style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
    >
      {wbsData?.eveluatorName || ''}
    </TableCell>
    <TableCell
      key={`${wbsData.wbsNumber}-status`}
      style={{
        backgroundColor:
          // eslint-disable-next-line no-nested-ternary
          wbsData.status === 2 ? 'green' : wbsData.status === 1 ? 'orange' : 'transparent',
        color: '#fff',
        textAlign: 'center',
        border: '1px solid #ccc',
      }}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {wbsData.status === 2 ? 'Completed' : wbsData.status === 1 ? 'Partially' : 'Not Yet'}
    </TableCell>
    <TableCell
      key={`${wbsData.wbsNumber}-tbd`}
      style={{ color: '#fff', textAlign: 'center', border: '1px solid #ccc' }}
    >
      {` `}
    </TableCell>
  </TableRow>
);

const WbsPivotTable: React.FC<GanttChartProps> = ({ wbs }) => {
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
          {wbs.map((wbsData) => (
            <React.Fragment key={wbsData.wbsNumber}>
              <RenderWbsRow wbsData={wbsData} />
              {wbsData.tasks?.map((taskData, index) => (
                <RenderRow
                  key={`${taskData.id}-${taskData.name}`}
                  index={index}
                  taskData={taskData}
                  users={users}
                />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default WbsPivotTable;
