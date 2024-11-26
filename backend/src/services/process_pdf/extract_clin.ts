import { ClinDocument, ClinModel } from '../../models/clin.model';

export const extractClinDetails = async (
  text: string,
  proposalId: string
): Promise<ClinDocument> => {
  await ClinModel.deleteMany({});

  const clinTitleMatch = text.match(/CLIN Title:\s*(.+)/);
  // const clinCodeMatch = text.match(/CLIN #:\s*(.+)/);
  const clinCodeMatch = text.match(/CLIN\s+\d+/);

  const clinData = {
    proposalId: proposalId,
    clinNumber: clinCodeMatch ? clinCodeMatch[0] : null,
    clinTitle: clinTitleMatch ? clinTitleMatch[1].trim() : null,
  };

  const newClin = new ClinModel(clinData);
  await newClin.save();
  return newClin;
};
