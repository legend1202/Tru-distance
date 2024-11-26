import { BoeModel } from "../../models/boe.model";
import { BoeDocument } from "../../models/boe.model";

export const extractBoeDetails = async (
    text: string,
    proposalId: string,
    wbsId: string,
    clinId: string
  ): Promise<BoeDocument> => {
    await BoeModel.deleteMany({});
  
    const startDateMatch = text.match(/BOE Start Date:\s*(\d{2}\/\d{4})/);
    const endDateMatch = text.match(/BOE End Date:\s*(\d{2}\/\d{4})/);
    const titleMatch = text.match(/BOE Title:\s*(.+?)\s/);
    const componentMatch = text.match(/Component:\s*(.+?)\s/);
    const createdByMatch = text.match(/BOE Author:\s*(.+?)\s/);
    const sowReferencePattern = text.match(
      /SOW Reference:\s*([\s\S]+?)(?=\n[A-Z][a-zA-Z]+\s*:|$)/
    );
    const boeDescriptionPattern = text.match(
      /BOE Description:\s*([\s\S]+?)(?=\n[A-Z][a-zA-Z]+\s*:|$)/
    );
  
    const boeData = {
      proposalId,
      wbsId,
      clinId,
      boeStartDate: startDateMatch ? startDateMatch[1].trim() : null,
      boeEnddate: endDateMatch ? endDateMatch[1].trim() : null,
      boeTitle: titleMatch ? titleMatch[1].trim() : null,
      component: componentMatch ? componentMatch[1].trim() : null,
      boeAuthor: createdByMatch ? createdByMatch[1].trim() : null,
      sowReference: sowReferencePattern
        ? sowReferencePattern[1]
            .split(/[;,]/)
            .map((ref) => ref.trim())
            .filter((ref) => ref !== '')
        : [],
  
      boeDescription: boeDescriptionPattern
        ? boeDescriptionPattern[1].trim()
        : null,
    };
  
    const newBoe = new BoeModel(boeData);
    await newBoe.save();
    return newBoe;
  };