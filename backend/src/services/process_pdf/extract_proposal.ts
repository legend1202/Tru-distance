import { ProposalDocument, ProposalModel } from '../../models/proposal.model';

export const extractProposalDetails = async (
  text: string
): Promise<ProposalDocument> => {
  await ProposalModel.deleteMany({});

  const proposalNameMatch = text.match(/Proposal\/Program Name:\s*(.+?)\s*\n/);

  const newProposal = new ProposalModel({
    proposalName: proposalNameMatch ? proposalNameMatch[1] : 'Unknown',
  });
  await newProposal.save();
  return newProposal;
};
