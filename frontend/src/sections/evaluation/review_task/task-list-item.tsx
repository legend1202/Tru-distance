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

  useEffect(() => {
    if (task.subtasks.length > 0) {
      setIsSubtask(true);
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
      <ListItemButton
        disableGutters
        onClick={() => handleClickTask(task.id)}
        sx={{
          py: 1,
          px: 2,
          // eslint-disable-next-line no-nested-ternary
          ...(selectedTaskId === task.id && !selectedSubTaskIndex
            ? {
                bgcolor: 'green',
              }
            : task.status === 2
              ? {
                  bgcolor: 'CornflowerBlue',
                }
              : {
                  bgcolor: 'transparent',
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

      {hasSubtask &&
        task.subtasks.map((subtask, index) => (
          <ListItemButton
            key={`subtask-${task.id}-${index}`} // Add the key here
            disableGutters
            onClick={() => handleClickSubTask(index + 1)}
            sx={{
              py: 0.5,
              px: 1,
              // eslint-disable-next-line no-nested-ternary
              ...(selectedTaskId === task.id && selectedSubTaskIndex === index + 1
                ? {
                    bgcolor: 'green',
                  }
                : subtask.status === 2
                  ? {
                      bgcolor: 'CornflowerBlue',
                    }
                  : {
                      bgcolor: 'transparent',
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
        ))}
    </>
  );
}
