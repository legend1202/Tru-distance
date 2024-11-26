import { ClientSession } from 'mongoose';
import { ClinDocument, ClinModel } from '../models/clin.model';

export const handleGetClin = async (
  session?: ClientSession
): Promise<ClinDocument[]> => {
  /* const wbs = await WbsModel.find(); */

  const clins = await ClinModel.find();

  return clins;
};
