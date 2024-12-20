import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Card, Button, useTheme, CardHeader, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

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

  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [selectedSubTaskIndex, setSelectedSubTaskIndex] = useState<number>(0);
  const [taskData, setTaskData] = useState<ITask[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (user?.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  useEffect(() => {
    if (data.length > 0) {
      setTaskData(data);
    }
  }, [data]);

  const handleStartEvaluation = () => {
    if (wbsId && selectedTaskId) {
      router.push(paths.evalation.question_flow.root(wbsId, selectedTaskId, selectedSubTaskIndex));
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
          <CardHeader title="Assigned Tasks" />
          <CardContent>
            {taskData.length > 0
              ? taskData.map((task, index) => (
                  <TaskListItem
                    key={index}
                    taskIndex={index}
                    userId={userId}
                    task={task}
                    selectedTaskId={selectedTaskId}
                    selectedSubTaskIndex={selectedSubTaskIndex}
                    handleSelectTaskId={handleSelectTaskId}
                    handleSelectSubTaskIndex={handleSelectSubTaskIndex}
                  />
                ))
              : 'Please select WBS'}
          </CardContent>
          <Box sx={{ position: 'absolute', bottom: 2, right: 2 }}>
            <Button variant="contained" sx={{ mr: 1 }} onClick={handleStartEvaluation}>
              Start Evaluation
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ScrolUIRightItem;
