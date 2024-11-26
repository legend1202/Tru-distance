import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Card, Button, useTheme, CardHeader, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import { IEvaluationData } from 'src/types/gantt';

import TaskListItem from './task-list-item';

type Props = {
  data: IEvaluationData[];
};

const ScrolUIRightItem = ({ data }: Props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [userId, setUserId] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (user?.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  const handleStartEvaluation = () => {
    router.push(paths.evalation.scope);
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
            {userId &&
              data.length > 0 &&
              data.map((task, index) => <TaskListItem key={index} userId={userId} task={task} />)}
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
