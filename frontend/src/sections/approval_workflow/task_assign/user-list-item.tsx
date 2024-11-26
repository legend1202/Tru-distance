import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  user: IUserItem;
  selected: boolean;
  handleSetUserId: (userId: string) => void;
};

export default function UserListItem({ user, selected, handleSetUserId }: Props) {
  const handleClickConversation = useCallback(async () => {
    try {
      handleSetUserId(user.id);
    } catch (error) {
      console.error(error);
    }
  }, [user.id, handleSetUserId]);

  const renderSingle = (
    <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
      <Avatar alt={user.name} src={user.avatarUrl} />
    </AvatarGroup>
  );

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
      {renderSingle}

      <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
        <ListItemText
          sx={{ ml: 2 }}
          primary={user.name}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'subtitle2',
          }}
          secondary={user.role.toString()}
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
