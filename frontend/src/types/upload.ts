import { IProposal } from './proposal';

export type IPdfType = File[];

export type IFilelist = {
  id: string;
  proposalId: string;
  filepath: string;
  fileType: number;
  proposalDetails: IProposal[];
  createdAt: Date;
  updateAt: Date;
};
