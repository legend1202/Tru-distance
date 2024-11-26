import { WbsDocument, WbsModel } from '../../models/wbs.model';

export const extractWbsDetails = async (
  text: string,
  proposalId: string
): Promise<WbsDocument> => {
  await WbsModel.deleteMany({});

  const wbsTitleMatch = text.match(/WBS Title:\s*(.+)/);
  const wbsCodeMatch = text.match(/WBS\s+#:\s*(\d+\.\d+\.\d+\.\d+)/);

  const wbsData = {
    proposalId: proposalId,
    wbsNumber: wbsCodeMatch ? wbsCodeMatch[1] : null,
    wbsTitle: wbsTitleMatch ? wbsTitleMatch[1].trim() : null,
  };

  const newWbs = new WbsModel(wbsData);
  await newWbs.save();
  return newWbs;
};
