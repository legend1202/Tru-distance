import Box from '@mui/material/Box';
import { Card, useTheme, CardHeader, CardContent } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

import { ITotalTaskDataByEvaluator } from 'src/types/evaluation';

import WbsListItem from './wbs-list-item';

type Props = {
  data: ITotalTaskDataByEvaluator[];
  selectedWbsId: string;
  handleSelectedWbsId: (wbsId: string) => void;
};

const ScrolUILeftItem = ({ data, selectedWbsId, handleSelectedWbsId }: Props) => {
  const handleSetWbsId = (wbsId: string) => {
    handleSelectedWbsId(wbsId);
  };
  const theme = useTheme();

  const renderList = (
    <>
      {data &&
        data.map((wbs) => (
          <WbsListItem
            key={wbs.id}
            wbs={wbs}
            selected={wbs.id === selectedWbsId}
            handleSetWbsId={handleSetWbsId}
          />
        ))}
    </>
  );

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
          <CardHeader title="WBS" />
          <CardContent>
            <Scrollbar sx={{ p: 1 }}>{renderList}</Scrollbar>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ScrolUILeftItem;
