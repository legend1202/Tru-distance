import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { ITotalTaskDataByEvaluator } from 'src/types/evaluation';

// ----------------------------------------------------------------------

type Props = {
  wbs: ITotalTaskDataByEvaluator;
  selected: boolean;
  handleSetWbsId: (userId: string) => void;
};

export default function WbsListItem({ wbs, selected, handleSetWbsId }: Props) {
  const handleClickConversation = useCallback(async () => {
    try {
      handleSetWbsId(wbs.id);
    } catch (error) {
      console.error(error);
    }
  }, [wbs.id, handleSetWbsId]);

  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
        <ListItemText
          sx={{ ml: 2 }}
          primary={wbs.wbsTitle}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'subtitle2',
          }}
          secondary={wbs.wbsNumber.toString()}
          secondaryTypographyProps={{
            noWrap: true,
            component: 'span',
            variant: 'subtitle2',
            color: 'text.primary',
          }}
        />
      </Stack>
    </ListItemButton>
  );
}
