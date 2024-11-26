
import { Stack, useTheme } from '@mui/material';

import Scrollbar from 'src/components/scrollbar/scrollbar';

import { IUserItem } from 'src/types/user';

import UserListItem from './user-list-item';

interface Props {
  users: IUserItem[];
  selectedUserId: string;
  handleSelectedUserId: (userId: string) => void;
}

const UserListView = ({ users, selectedUserId, handleSelectedUserId }: Props) => {
  const theme = useTheme();

  const handleSetUserId = (userId: string) => {
    handleSelectedUserId(userId);
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
