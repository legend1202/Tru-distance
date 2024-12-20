import { ProposalDocument, ProposalModel } from '../../models/proposal.model';

export const handleProposalDetails = async (
  proposalName: string
): Promise<ProposalDocument> => {
  await ProposalModel.deleteMany({});

  const newProposal = new ProposalModel({
    proposalName: proposalName ? proposalName : 'Unknown',
  });
  await newProposal.save();
  return newProposal;
};
