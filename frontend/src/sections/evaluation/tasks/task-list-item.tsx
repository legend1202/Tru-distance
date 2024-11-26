import { useState, useEffect } from 'react';

import ListItemText from '@mui/material/ListItemText';

import { IEvaluationData } from 'src/types/gantt';

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  task: IEvaluationData;
};

export default function TaskListItem({ userId, task }: Props) {
  const [hasSubtask, setIsSubtask] = useState<boolean>(false);

  const [isTask, setIsTask] = useState<boolean>(false);

  useEffect(() => {
    if (task.assignedUsers.includes(userId) || false) {
      setIsTask(true);
      if (task.subtasks.length > 0) {
        setIsSubtask(true);
      }
    }
  }, [task, userId]);

  return (
    <>
      {isTask && (
        <ListItemText
          sx={{ ml: 2 }}
          primary={`${task.taskCode}. ${task.name}`}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'subtitle2',
          }}
        />
      )}
      {hasSubtask &&
        task.subtasks.map(
          (subtask, index) =>
            subtask.assignedUsers.includes(userId) && (
              <ListItemText
                key={index}
                sx={{ ml: 4 }}
                primary={`${index + 1}. ${subtask.name}`}
                primaryTypographyProps={{
                  noWrap: true,
                  variant: 'subtitle2',
                }}
              />
            )
        )}
    </>
  );
}
