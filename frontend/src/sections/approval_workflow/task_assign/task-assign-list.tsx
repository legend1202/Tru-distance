import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Checkbox, Typography } from '@mui/material';

import { TaskAssignApprove } from 'src/api/approve';

import Scrollbar from 'src/components/scrollbar/scrollbar';

import { IEvaluationData } from 'src/types/gantt';

interface Props {
  data: IEvaluationData[];
  wbsId: string;
  selectedUserId: string;
}

const TaskAssignListView = ({ data, wbsId, selectedUserId }: Props) => {
  const [tasks, setTasks] = useState<IEvaluationData[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data.length > 0) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  }, [data]);

  const handleTaskChange = (taskIndex: number) => {
    setTasks((prevTasks) => {
      // Create a copy of the current tasks array
      const updatedTasks = [...prevTasks];

      // Check if the selected user is already assigned to the task
      const userExist = updatedTasks[taskIndex].assignedUsers?.includes(selectedUserId) || false;

      if (userExist) {
        // Remove the user from the task's assigned users
        updatedTasks[taskIndex].assignedUsers = updatedTasks[taskIndex].assignedUsers?.filter(
          (id) => id !== selectedUserId
        );
        if (updatedTasks[taskIndex].subtasks.length > 0) {
          updatedTasks[taskIndex].subtasks = updatedTasks[taskIndex].subtasks.map((subtask) => ({
            ...subtask,
            assignedUsers: subtask.assignedUsers?.filter((id) => id !== selectedUserId),
          }));
        }
      } else {
        // Add the user to the task's assigned users
        const existingData = updatedTasks[taskIndex].assignedUsers || [];
        updatedTasks[taskIndex].assignedUsers = [...existingData, selectedUserId];
        if (updatedTasks[taskIndex].subtasks.length > 0) {
          updatedTasks[taskIndex].subtasks = updatedTasks[taskIndex].subtasks.map((subtask) => ({
            ...subtask,
            assignedUsers: [...subtask.assignedUsers, selectedUserId],
          }));
        }
      }

      // Return the updated tasks array
      return updatedTasks;
    });
  };

  const handleSubtaskChange = (taskIndex: number, subtaskIndex: number) => {
    setTasks((prevTasks) => {
      // Create a copy of the current tasks array
      const updatedTasks = [...prevTasks];

      // Check if the selected user is already assigned to the task
      const userExist =
        updatedTasks[taskIndex].subtasks[subtaskIndex].assignedUsers?.includes(selectedUserId) ||
        false;

      if (userExist) {
        // Remove the user from the task's assigned users
        updatedTasks[taskIndex].subtasks[subtaskIndex].assignedUsers = updatedTasks[
          taskIndex
        ].subtasks[subtaskIndex].assignedUsers?.filter((id) => id !== selectedUserId);
      } else {
        // Add the user to the task's assigned users
        const existingData = updatedTasks[taskIndex].subtasks[subtaskIndex].assignedUsers || [];
        updatedTasks[taskIndex].subtasks[subtaskIndex].assignedUsers = [
          ...existingData,
          selectedUserId,
        ];
      }
      const userExistAfterUpdate = updatedTasks[taskIndex].subtasks.some(
        (subtask) => subtask.assignedUsers.includes(selectedUserId) || false
      );
      if (userExistAfterUpdate) {
        const existingData = updatedTasks[taskIndex].assignedUsers || [];
        updatedTasks[taskIndex].assignedUsers = [...existingData, selectedUserId];
      } else {
        updatedTasks[taskIndex].assignedUsers = updatedTasks[taskIndex].assignedUsers?.filter(
          (id) => id !== selectedUserId
        );
      }
      // Return the updated tasks array
      return updatedTasks;
    });
  };

  const handleApprove = async () => {
    const result = await TaskAssignApprove(tasks);
    if (result.data) {
      enqueueSnackbar('Approve success!');
    } else {
      console.error('Approval failed');
    }
  };

  return (
    <Stack
      sx={{
        p: 2,
        width: 1,
        height: 1,
        overflow: 'hidden',
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        {tasks &&
          tasks.map((task, taskIndex) => (
            <Box key={task.taskCode}>
              <Typography>
                <Checkbox
                  checked={task.assignedUsers?.includes(selectedUserId)}
                  onChange={() => handleTaskChange(taskIndex)}
                />
                {task.name}
              </Typography>
              <Box sx={{ pl: 4 }}>
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <Typography key={subtask.subtaskCode}>
                    <Checkbox
                      checked={subtask.assignedUsers?.includes(selectedUserId)}
                      onChange={() => handleSubtaskChange(taskIndex, subtaskIndex)}
                    />
                    {subtask.name}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
      </Scrollbar>
      <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={handleApprove}>
        Approve
      </Button>
    </Stack>
  );
};

export default TaskAssignListView;
