import React, { useState, useEffect } from 'react';

import { Box, Checkbox, Typography } from '@mui/material';

import { ITask } from 'src/types/wbs';

interface ChecklistProps {
  data: ITask[];
}

const Checklist = ({ data }: ChecklistProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const initializedTasks = data.map((task) => ({
        ...task,
        checked: false,
        subtasks: task.subtasks.map((subtask) => ({ ...subtask, checked: false })),
      }));
      setTasks(initializedTasks);
    }
  }, [data]);

  const handleTaskChange = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[taskIndex];
    const isChecked = !task.checked;

    // Update task and its subtasks' checked status
    task.checked = isChecked;
    task.subtasks = task.subtasks.map((subtask) => ({
      ...subtask,
      checked: isChecked,
    }));

    setTasks(updatedTasks);
  };

  const handleSubtaskChange = (taskIndex: number, subtaskIndex: number) => {
    const updatedTasks = [...tasks];
    const subtask = updatedTasks[taskIndex].subtasks[subtaskIndex];
    subtask.checked = !subtask.checked;

    // Check if all subtasks are checked to update the parent task's checked status
    const allSubtasksChecked = updatedTasks[taskIndex].subtasks.every((sub) => sub.checked);
    updatedTasks[taskIndex].checked = allSubtasksChecked;

    setTasks(updatedTasks);
  };
  return (
    <Box>
      {tasks.map((task, taskIndex) => (
        <Box key={task.id}>
          <Typography>
            <Checkbox checked={task.checked} onChange={() => handleTaskChange(taskIndex)} />
            {task.name}
          </Typography>
          <Box style={{ paddingLeft: '20px' }}>
            {task.subtasks.map((subtask, subtaskIndex) => (
              <Box key={subtask.subtaskCode}>
                <Typography>
                  <Checkbox
                    checked={subtask.checked}
                    onChange={() => handleSubtaskChange(taskIndex, subtaskIndex)}
                  />
                  {subtask.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Checklist;
