import { useState } from 'react';

import { Stack, useTheme } from '@mui/material';

import Scrollbar from 'src/components/scrollbar/scrollbar';

import { IUserItem } from 'src/types/user';

import UserListItem from './user-list-item';

interface Props {
  users: IUserItem[];
}

const UserListView = ({ users }: Props) => {
  const theme = useTheme();

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleSetUserId = (userId: string) => {
    setSelectedUserId(userId);
  };
  const renderList = (
    <>
      {users &&
        users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            selected={user.id === selectedUserId}
            handleSetUserId={handleSetUserId}
          />
        ))}
    </>
  );
  return (
    <Stack
      sx={{
        height: 1,
        p: 2,
        flexShrink: 0,
        width: 320,
        borderRight: `solid 1px ${theme.palette.divider}`,
        transition: theme.transitions.create(['width'], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Scrollbar sx={{ p: 1 }}>{renderList}</Scrollbar>
    </Stack>
  );
};

export default UserListView;
