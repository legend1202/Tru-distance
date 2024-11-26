import { Document } from 'mongoose';
import {
  ClientSession,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { ProposalDocument, ProposalModel } from '../models/proposal.model';

export const handleGetProposal = async (
  session?: ClientSession
): Promise<ProposalDocument[]> => {
  /* const wbs = await WbsModel.find(); */

  const proposals = await ProposalModel.find();

  return proposals;
};

export const handleProposalUpdate = async (
  approveData: Partial<ProposalDocument[]> & Document,
  session?: ClientSession
) => {
  approveData.forEach(async (newProposal) => {
    if (newProposal?.id) {
      const updateProposal = await findByIdAndUpdateProposalDocument(
        newProposal?.id,
        {
          ...newProposal,
        }
      );
      return updateProposal;
    }
  });
};

export const findByIdAndUpdateProposalDocument = async (
  id: string,
  update: UpdateQuery<ProposalDocument>,
  options?: QueryOptions<ProposalDocument>
) => {
  return await ProposalModel.findOneAndUpdate({ id }, update, {
    ...options,
    returnDocument: 'after',
  });
};
