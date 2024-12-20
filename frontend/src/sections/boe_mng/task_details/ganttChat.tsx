import React, { useState, useEffect } from 'react';

import { Table, Button, TableRow, Container, TableCell, TableHead, TableBody } from '@mui/material';

import { transformData } from 'src/utils/gantt-data';

import { IWbs } from 'src/types/wbs';
import { IPeriodOfPerformance } from 'src/types/flowData';
import { IGanttWbsItem, IGanttTaskItem } from 'src/types/gantt';

interface GanttChartProps {
  tasks: IWbs[];
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
  'Total',
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
  'Total',
];

const NewGanttChart: React.FC<GanttChartProps> = ({ tasks, monthFlag, workPeriod }) => {
  const [months, setMonths] = useState<string[]>(calendarMonths);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [tableData, setTableData] = useState<IGanttWbsItem[]>();

  useEffect(() => {
    // if (workPeriod) {
    // const monthList = generateMonthList(workPeriod?.start, workPeriod?.end);
    if (monthFlag) {
      setMonths(calendarMonths);
      // setMonths(monthList);
    } else {
      setMonths(fiscalMonths);
      // setMonths(monthList);
    }
    // }
  }, [monthFlag, workPeriod]);

  useEffect(() => {
    if (tasks.length > 0) {
      const result = transformData(tasks, monthFlag);
      setTableData(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    }
  }, [tasks, monthFlag]);

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
  const renderSubRow = (task: IGanttTaskItem, i: number) => (
    <React.Fragment key={task.id}>
      {/* Task Row */}
      <TableRow key={task.id}>
        <TableCell
          style={{
            paddingLeft: '48px',
            border: '1px solid #ccc',
            width: '200px', // Ensure consistent width with the header
          }}
        >
          {i + 1}. {task.name}
        </TableCell>

        {/* Month cells */}
        {task.hours.map((monthValue, index) => (
          <TableCell
            key={`${task.name}-${index}`}
            style={{
              // eslint-disable-next-line no-nested-ternary
              backgroundColor: monthValue ? '#227acb' : 'transparent',
              color: '#fff',
              textAlign: 'center',
              border: '1px solid #ccc',
            }}
          >
            {monthValue || ''}
          </TableCell>
        ))}

        <TableCell
          style={{
            // eslint-disable-next-line no-nested-ternary
            backgroundColor: task.total ? 'green' : 'transparent',
            color: '#fff',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          {task.total || ''}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );

  const renderRow = (tableDataItem: IGanttWbsItem, isSubtask = false): any => {
    const isExpanded = expandedTasks.has(tableDataItem.name);
    const hasSubtasks = tableDataItem?.tasks && tableDataItem.tasks.length > 0;

    return (
      <React.Fragment key={tableDataItem.id}>
        {/* Task Row */}
        <TableRow key={tableDataItem.id}>
          <TableCell
            style={{
              paddingLeft: isSubtask ? '48px' : '15px',
              border: '1px solid #ccc',
              width: '200px', // Ensure consistent width with the header
            }}
          >
            {hasSubtasks && (
              <Button
                onClick={() => toggleTask(tableDataItem.name)}
                style={{
                  marginRight: '10px',
                  cursor: 'pointer',
                  minWidth: '20px',
                }}
              >
                {isExpanded ? '-' : '+'}
              </Button>
            )}
            {tableDataItem.name}
          </TableCell>

          {/* Month cells */}
          {tableDataItem.hours.map((monthValue, index) => (
            <TableCell
              key={index}
              style={{
                // eslint-disable-next-line no-nested-ternary
                backgroundColor: monthValue ? '#227acb' : 'transparent',
                color: '#fff',
                textAlign: 'center',
                border: '1px solid #ccc',
              }}
            >
              {monthValue || ''}
            </TableCell>
          ))}

          <TableCell
            style={{
              // eslint-disable-next-line no-nested-ternary
              backgroundColor: tableDataItem.total ? 'green' : 'transparent',
              color: '#fff',
              textAlign: 'center',
              border: '1px solid #ccc',
            }}
          >
            {tableDataItem.total || ''}
          </TableCell>
        </TableRow>

        {/* Render Subtasks if Expanded */}
        {isExpanded && tableDataItem.tasks?.map((task, i) => renderSubRow(task, i))}
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
                padding: '5px 48px',
                border: '1px solid #ccc',
                width: '200px', // Ensure consistent width with the header
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
        {tableData && (
          <TableBody>{tableData.map((tableDataItem, index) => renderRow(tableDataItem))}</TableBody>
        )}
      </Table>
    </Container>
  );
};

export default NewGanttChart;
