import { useState, useEffect, useCallback } from 'react';

import { Stack } from '@mui/system';
import { ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { IEvaluationData } from 'src/types/gantt';

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  task: IEvaluationData;
  selectedTaskId: string;
  selectedSubTaskIndex: number;
  handleSelectTaskId: (taskId: string) => void;
  handleSelectSubTaskIndex: (taskId: string, subTaskId: number) => void;
};

export default function TaskListItem({
  userId,
  task,
  selectedTaskId,
  selectedSubTaskIndex,
  handleSelectTaskId,
  handleSelectSubTaskIndex,
}: Props) {
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

  const handleClickTask = useCallback(
    async (taskId: string) => {
      try {
        handleSelectTaskId(taskId);
      } catch (error) {
        handleSelectTaskId('');
      }
    },
    [handleSelectTaskId]
  );

  const handleClickSubTask = useCallback(
    async (subTaskIndex: number) => {
      try {
        handleSelectSubTaskIndex(task.id, subTaskIndex);
      } catch (error) {
        handleSelectTaskId('');
      }
    },
    [handleSelectSubTaskIndex, handleSelectTaskId, task.id]
  );

  return (
    <>
      {isTask && (
        <ListItemButton
          disableGutters
          onClick={() => handleClickTask(task.id)}
          sx={{
            py: 1,
            px: 2,
            ...(selectedTaskId === task.id &&
              !selectedSubTaskIndex && {
                bgcolor: 'green',
              }),
          }}
        >
          <Stack alignItems="flex-end" sx={{ ml: 2 }}>
            <ListItemText
              sx={{ ml: 0 }}
              primary={`${task.taskCode}. ${task.name}`}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'subtitle2',
              }}
            />
          </Stack>
        </ListItemButton>
      )}
      {hasSubtask &&
        task.subtasks.map((subtask, index) => {
          if (subtask.assignedUsers.includes(userId)) {
            return (
              <ListItemButton
                key={`subtask-${task.id}-${index}`} // Add the key here
                disableGutters
                onClick={() => handleClickSubTask(index + 1)}
                sx={{
                  py: 0.5,
                  px: 1,
                  ...(selectedTaskId === task.id &&
                    selectedSubTaskIndex === index + 1 && {
                      bgcolor: 'green',
                    }),
                }}
              >
                <Stack alignItems="flex-end" sx={{ ml: 2 }}>
                  <ListItemText
                    sx={{ ml: 5 }}
                    primary={`${index + 1}. ${subtask.name}`}
                    primaryTypographyProps={{
                      noWrap: true,
                      variant: 'subtitle2',
                    }}
                  />
                </Stack>
              </ListItemButton>
            );
          }
          return null;
        })}
    </>
  );
}
