import { BoeModel } from '../../models/boe.model';
import { ClinDocument, ClinModel } from '../../models/clin.model';
import { WbsDocument, WbsModel } from '../../models/wbs.model';
import { RequestError } from '../../utils/globalErrorHandler';
import { handleTaskDetails } from './task';

export const handleWbsDetails = async (wbs: any[], proposalId: string) => {
  await WbsModel.deleteMany({});
  await ClinModel.deleteMany({});
  try {
    wbs.map(async (wbsElement) => {
      const newWbsData = {
        proposalId,
        wbsNumber: wbsElement?.wbsNumber || '',
        wbsTitle: wbsElement?.wbsTitle || '',
      };
      const newClinData = {
        proposalId,
        clinNumber: wbsElement?.clinNumber || '',
        clinTitle: wbsElement?.clinTitle || '',
      };

      // Wbs data save
      const newWbs = new WbsModel(newWbsData);
      const wbsResult = await newWbs.save();

      // Clin data save
      const newClin = new ClinModel(newClinData);
      const clinResult = await newClin.save();

      //Boe Data save
      const newBoeData = {
        proposalId,
        wbsId: wbsResult.id,
        clinId: clinResult.id,
        boeStartDate: wbsElement?.start_date || '',
        boeEnddate: wbsElement?.end_date || '',
        boeTitle: wbsElement?.boeTitle || '',
        component: wbsElement?.component || '',
        boeAuthor: wbsElement?.boeAuthor || '',
        sowReference: wbsElement?.sowReference
          ? [wbsElement?.sowReference]
          : [],
        boeDescription: wbsElement?.boeDescription || '',
      };

      const newBoe = new BoeModel(newBoeData);
      const boeResult = await newBoe.save();

      await handleTaskDetails(
        wbsElement.tasks,
        proposalId,
        wbsResult.id,
        clinResult.id,
        boeResult.id
      );
    });
  } catch (error) {
    throw new RequestError(`There is not ${error}.`, 500);
  }
};
