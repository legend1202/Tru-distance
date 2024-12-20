import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Card, Button, useTheme, CardHeader, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { UpdateTaskStatus } from 'src/api/evaluation';

import { ITask } from 'src/types/task';

import TaskListItem from './task-list-item';

type Props = {
  data: ITask[];
  wbsId: string;
};

const ScrolUIRightItem = ({ data, wbsId }: Props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [userId, setUserId] = useState('');

  const [tasks, settasks] = useState<ITask[]>();

  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [selectedSubTaskIndex, setSelectedSubTaskIndex] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (user?.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  useMemo(() => {
    if (data.length > 0) {
      settasks(data);
    }
  }, [data]);

  const handleStartEvaluation = () => {
    if (wbsId && selectedTaskId) {
      router.push(paths.evalation.question_flow.root(wbsId, selectedTaskId, selectedSubTaskIndex));
    }
  };

  const handleApproveReviewedTask = async () => {
    if (wbsId && selectedTaskId) {
      const result = await UpdateTaskStatus(wbsId, selectedTaskId, selectedSubTaskIndex, 2);
      if (result.data.success) {
        const tempTasks = tasks;
        tempTasks?.forEach((task, taskIndex) => {
          if (task.id === selectedTaskId && task.wbsId === wbsId) {
            if (selectedSubTaskIndex > 0) {
              tempTasks[taskIndex].subtasks[selectedSubTaskIndex - 1].status = 2;
            } else {
              tempTasks[taskIndex].status = 2;
            }
          }
        });
        settasks(tempTasks);
      } else {
        console.log('failed', result);
      }
    }
  };

  const handleSelectTaskId = (taskId: string) => {
    setSelectedTaskId(taskId);
    setSelectedSubTaskIndex(0);
  };
  const handleSelectSubTaskIndex = (taskId: string, subTaskIndex: number) => {
    setSelectedTaskId(taskId);
    setSelectedSubTaskIndex(subTaskIndex);
  };

  return (
    <Box
      sx={{
        width: '48%',
        position: 'relative',
      }}
    >
      <Box
        display="grid"
        gridTemplateRows="1fr auto"
        height="80vh"
        bgcolor="#333"
        color="white"
        fontFamily="monospace"
        overflow="hidden"
        sx={{
          p: 2,
          borderRight: `solid 1px ${theme.palette.divider}`,
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Card>
          <CardHeader title="Tasks" />
          <CardContent>
            {userId &&
              tasks?.map((task, index) => (
                <TaskListItem
                  key={index}
                  userId={userId}
                  task={task}
                  selectedTaskId={selectedTaskId}
                  selectedSubTaskIndex={selectedSubTaskIndex}
                  handleSelectTaskId={handleSelectTaskId}
                  handleSelectSubTaskIndex={handleSelectSubTaskIndex}
                />
              ))}
          </CardContent>
          <Box sx={{ position: 'absolute', bottom: 2, right: 2 }}>
            <Button
              variant="contained"
              sx={{
                mr: 1,
                color: 'white',
                backgroundColor: 'green',
                '&:hover': {
                  backgroundColor: 'darkgreen', // Change hover color if desired
                },
              }}
              onClick={handleApproveReviewedTask}
            >
              Approve Task
            </Button>
            <Button variant="contained" sx={{ mr: 1 }} onClick={handleStartEvaluation}>
              Start Review
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ScrolUIRightItem;
