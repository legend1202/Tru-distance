import fs from 'fs';
import pdfParse from 'pdf-parse';

import { extractProposalDetails } from './extract_proposal';
import { extractWbsDetails } from './extract_wbs';
import { extractClinDetails } from './extract_clin';
import { extractBoeDetails } from './extract_boe';
import { extractGraDetails } from './extract_gra';
import { extractTaskDetails } from './extract_task';
import { saveFilepath } from './file_save';

const extractPdfText = async (pdfData: Buffer): Promise<string> => {
  const data = await pdfParse(pdfData);
  return data.text;
};

// Main function to extract and save data
export const processBoeFunc = async (pdfPath: string) => {
  try {
    /* const pdfPath = '1.pdf'; */
    const pdfData = fs.readFileSync(pdfPath);

    const pdfText = await extractPdfText(pdfData);

    const proposalData = await extractProposalDetails(pdfText);
    const wbsData = await extractWbsDetails(pdfText, proposalData.id);
    await saveFilepath(proposalData.id, pdfPath);

    const clinData = await extractClinDetails(pdfText, proposalData.id);
    const boeData = await extractBoeDetails(
      pdfText,
      proposalData.id,
      wbsData.id,
      clinData.id
    );

    await extractGraDetails(
      pdfText,
      proposalData.id,
      wbsData.id,
      clinData.id,
      boeData.id
    );

    await extractTaskDetails(
      pdfText,
      proposalData.id,
      wbsData.id,
      clinData.id,
      boeData.id
    );
  } catch (err) {
    console.error('Error:', err);
  }
  // fs.unlink(pdfPath, (err) => {
  //   if (err) {
  //     console.error(`Error deleting file: ${err.message}`);
  //   } else {
  //     console.log('File deleted successfully');
  //   }
  // });
};
