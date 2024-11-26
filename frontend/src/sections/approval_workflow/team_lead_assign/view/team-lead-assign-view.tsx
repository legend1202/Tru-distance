import { useState, useEffect } from 'react';

import { Card, Stack } from '@mui/material';
import Container from '@mui/material/Container';

import { haveCommonItem } from 'src/utils/role-check';

import { useGetUserLists } from 'src/api/admin';
import { useGetProposalLists } from 'src/api/proposal';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IUserItem } from 'src/types/user';
import { IProposal } from 'src/types/proposal';

import UserListView from '../user-list-view';
import ProposalListView from '../proposal-list';
// ----------------------------------------------------------------------

export default function TeamLeadAssignView() {
  const settings = useSettingsContext();

  const { users } = useGetUserLists();

  const { proposalList } = useGetProposalLists();

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const [proposals, setProposals] = useState<IProposal[]>([]);

  const [teamleads, setTeamLeads] = useState<IUserItem[]>([]);

  const [childKey, setChildKey] = useState(0);

  useEffect(() => {
    if (users.length > 0) {
      const filteredUsers = users.filter((user) => haveCommonItem(['Lead'], user.role));
      setTeamLeads(filteredUsers);
      setSelectedUserId(filteredUsers[0]?.id || '');
    }
  }, [users]);

  useEffect(() => {
    if (proposalList.length > 0) {
      setProposals(proposalList);
    }
  }, [proposalList]);

  useEffect(() => {
    setChildKey((prevKey) => prevKey + 1); // Update key to force re-render
  }, [selectedUserId]);

  const handleSelectedUserId = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomBreadcrumbs
        heading="Team Lead Assign"
        links={[{ name: '' }]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <Stack component={Card} direction="row" justifyContent="space-between">
        <UserListView
          users={teamleads}
          selectedUserId={selectedUserId}
          handleSelectedUserId={handleSelectedUserId}
        />

        <ProposalListView key={childKey} data={proposals} selectedUserId={selectedUserId} />
      </Stack>
    </Container>
  );
}
