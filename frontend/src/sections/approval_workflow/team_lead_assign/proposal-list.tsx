import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Checkbox, Typography } from '@mui/material';

import { TeamLeadAssignApproveForProposal } from 'src/api/proposal';

import Scrollbar from 'src/components/scrollbar/scrollbar';

import { IProposal } from 'src/types/proposal';

interface Props {
  data: IProposal[];
  selectedUserId: string;
}

const ProposalListView = ({ data, selectedUserId }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [proposals, setProposals] = useState<IProposal[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setProposals(data);
    }
  }, [data]);

  const handleTaskChange = (proposalIndex: number) => {
    const selectedProposal = proposals[proposalIndex];
    const restProposals = proposals.filter((proposal) => proposal.id !== selectedProposal.id);

    const userExist = selectedProposal.teamLead?.includes(selectedUserId) || false;
    if (userExist) {
      selectedProposal.teamLead = selectedProposal.teamLead?.filter(
        (lead) => lead !== selectedUserId
      );
    } else {
      const existingData = selectedProposal.teamLead || [];
      selectedProposal.teamLead = [...existingData, selectedUserId];
    }
    const updatedProposals = [...restProposals, selectedProposal];
    setProposals(updatedProposals);
  };

  const handleApprove = async () => {
    const result = await TeamLeadAssignApproveForProposal(proposals);
    if (result.data) {
      enqueueSnackbar('Approve success!');
    } else {
      console.error('Approval failed');
    }
  };

  return (
    <Stack
      sx={{
        p: 2,
        width: 1,
        height: 1,
        overflow: 'hidden',
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        {proposals &&
          proposals.map((proposal, proposalIndex) => (
            <Box key={proposalIndex}>
              <Typography>
                <Checkbox
                  checked={proposal.teamLead?.includes(selectedUserId)}
                  onChange={() => handleTaskChange(proposalIndex)}
                />
                {proposal.proposalName}
              </Typography>
            </Box>
          ))}
      </Scrollbar>
      <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={handleApprove}>
        Approve
      </Button>
    </Stack>
  );
};

export default ProposalListView;
