
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

import Scrollbar from 'src/components/scrollbar/scrollbar';

import { ITask } from 'src/types/wbs';

import Checklist from './check-list';

interface Props {
  tasks: ITask[];
}

const TaskAssignListView = ({ tasks }: Props) => (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          <Checklist data={tasks} />
        </Box>
      </Scrollbar>
    </Stack>
  );

export default TaskAssignListView;
