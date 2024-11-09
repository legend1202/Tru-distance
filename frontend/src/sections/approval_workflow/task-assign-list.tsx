import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Checkbox, Typography } from '@mui/material';

import { TaskAssignApprove, GetApprovedTaskByuserId_WbsId } from 'src/api/approve';

import Scrollbar from 'src/components/scrollbar/scrollbar';

import { ITask } from 'src/types/wbs';
import { IApproveTask } from 'src/types/task';

interface Props {
  data: ITask[];
  wbsId: string;
  selectedUserId: string;
}

const TaskAssignListView = ({ data, wbsId, selectedUserId }: Props) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { approvedData } = GetApprovedTaskByuserId_WbsId(wbsId, selectedUserId);

  const initializeTasks = (tasksData: ITask[]) =>
    tasksData.map((task) => ({
      ...task,
      checked: false,
      subtasks: task.subtasks.map((subtask) => ({ ...subtask, checked: false })),
    }));

  useEffect(() => {
    if (tasks.length < 1) {
      setTasks(approvedData?.tasks || initializeTasks(data));
    }
  }, [approvedData, data, tasks]);

  const handleTaskChange = (taskIndex: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const task = updatedTasks[taskIndex];
      task.checked = !task.checked;
      task.subtasks = task.subtasks.map((subtask) => ({
        ...subtask,
        checked: task.checked,
      }));
      return updatedTasks;
    });
  };

  const handleSubtaskChange = (taskIndex: number, subtaskIndex: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const subtask = updatedTasks[taskIndex].subtasks[subtaskIndex];
      subtask.checked = !subtask.checked;
      updatedTasks[taskIndex].checked = updatedTasks[taskIndex].subtasks.every(
        (sub) => sub.checked
      );
      return updatedTasks;
    });
  };

  const handleApprove = async () => {
    const approveData: IApproveTask = {
      id: approvedData?.id,
      userId: selectedUserId,
      wbsId,
      tasks,
    };
    const result = await TaskAssignApprove(approveData);
    if (result.data) {
      enqueueSnackbar('Approve success!');
      setTasks(result.data.result.tasks);
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
                <Checkbox checked={task.checked} onChange={() => handleTaskChange(taskIndex)} />
                {task.name}
              </Typography>
              <Box sx={{ pl: 4 }}>
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <Typography key={subtask.subtaskCode}>
                    <Checkbox
                      checked={subtask.checked}
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
