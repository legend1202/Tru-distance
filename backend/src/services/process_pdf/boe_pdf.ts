import fs from 'fs';
import pdfParse from 'pdf-parse';
import { Boe, BoeModel } from '../../models/boe.model';
import { ClientSession } from 'mongoose';
import { Wbs, WbsModel } from '../../models/wbs.model';
import { TaskModel } from '../../models/task.model';

// Define types for BOE, WBS, and Task data structures
type PeriodOfPerformance = {
  start: string | null;
  end: string | null;
};

type BoeData = {
  name: string;
  title: string;
  proposalName: string;
  createdBy: string;
  periodOfPerformance: PeriodOfPerformance;
  description: string;
};

type Task = {
  wbsId?: string;
  taskCode: string;
  name: string;
  periodOfPerformance: PeriodOfPerformance;
  description: string;
  methodology: string;
  hoursDistribution: {
    yearly: number | null;
    monthly: number | null;
  };
  costDistribution: {
    yearly: number | null;
    monthly: number | null;
  };
};

type WbsData = {
  title: string | null;
  wbsCode: string | null;
  tasks: Task[];
};

// Load the PDF
/* const pdfPath = '1.pdf'; */
/* const pdfData = fs.readFileSync(pdfPath); */

// Function to extract text from PDF
const extractPdfText = async (pdfData: Buffer): Promise<string> => {
  const data = await pdfParse(pdfData);
  return data.text;
};

// Helper function to parse date in MM/YYYY format
const parseDate = (dateStr: string): string | null => {
  const dateParts = dateStr.match(/(\d{2})\/(\d{4})/);
  if (dateParts) {
    const [_, month, year] = dateParts;
    return new Date(`${year}-${month}-01`).toISOString();
  }
  return null;
};

// Define functions to extract specific fields
const extractProposalDetails = async (
  text: string,
  session?: ClientSession
): Promise<Boe> => {
  await BoeModel.deleteMany({});
  const nameMatch = text.match(/Proposal\/Program Name:\s*(.+?)\s/);
  const titleMatch = text.match(/BOE Title:\s*(.+?)\s/);
  const proposalNameMatch = text.match(/Proposal\/Program Name:\s*(.+?)\s/);
  const createdByMatch = text.match(/BOE Author:\s*(.+?)\s/);
  const startDateMatch = text.match(/BOE Start Date:\s*(\d{2}\/\d{4})/);
  const endDateMatch = text.match(/BOE End Date:\s*(\d{2}\/\d{4})/);

  const boeData: BoeData = {
    name: nameMatch ? nameMatch[1] : 'Unknown',
    title: titleMatch ? titleMatch[1] : 'Unknown',
    proposalName: proposalNameMatch ? proposalNameMatch[1] : 'Unknown',
    createdBy: createdByMatch ? createdByMatch[1] : 'Unknown',
    periodOfPerformance: {
      start: startDateMatch ? parseDate(startDateMatch[1]) : null,
      end: endDateMatch ? parseDate(endDateMatch[1]) : null,
    },
    description:
      'The tasks described in this Basis of Estimate (BOE) are in support of Contract Work Breakdown Structure (CWBS) element 1.2.3.4 Party Support.',
  };

  const newBoe = new BoeModel(boeData);

  await newBoe.save({ session });
  return newBoe;
};

const extractWbsDetails = async (text: string, boeId: string): Promise<Wbs> => {
  await WbsModel.deleteMany({});
  const wbsTitleMatch = text.match(/WBS Title:\s*(.+)/);
  const wbsCodeMatch = text.match(/WBS\s+#:\s*(\d+\.\d+\.\d+\.\d+)/);

  const tasks: Task[] = [];
  const taskPattern =
    /Task\s+(\d+):\s+(.+?)\s*Start Date:\s*(\d{2}\/\d{4})\s*End Date:\s*(\d{2}\/\d{4})/g;
  let match;

  while ((match = taskPattern.exec(text)) !== null) {
    tasks.push({
      taskCode: match[1],
      name: match[2].trim(),
      periodOfPerformance: {
        start: parseDate(match[3]),
        end: parseDate(match[4]),
      },
      description: 'TBD',
      methodology: '',
      hoursDistribution: {
        yearly: null,
        monthly: null,
      },
      costDistribution: {
        yearly: null,
        monthly: null,
      },
    });
  }

  const wbsData = {
    boeId: boeId,
    title: wbsTitleMatch ? wbsTitleMatch[1].trim() : null,
    wbsCode: wbsCodeMatch ? wbsCodeMatch[1] : null,
    tasks,
  };

  const newWbs = new WbsModel(wbsData);

  await newWbs.save();
  return newWbs;
};

const extractTaskDetails = async (text: string, wbsId: string) => {
  await TaskModel.deleteMany({});
  /* const taskList: Task[] = []; */
  const taskPattern =
    /Task (\d+): (.+?)\nStart Date:\s*(\d{2}\/\d{4})\s*End Date:\s*(\d{2}\/\d{4})/g;
  let match;

  while ((match = taskPattern.exec(text)) !== null) {
    const task = {
      wbsId,
      taskCode: match[1],
      name: match[2].trim(),
      periodOfPerformance: {
        start: parseDate(match[3]),
        end: parseDate(match[4]),
      },
      description: 'TBD',
      methodology: '',
      hoursDistribution: {
        yearly: null,
        monthly: null,
      },
      costDistribution: {
        yearly: null,
        monthly: null,
      },
    };
    const newTasks = new TaskModel(task);

    await newTasks.save();
  }
};

// Main function to extract and save data
export const processBoeFunc = async (pdfPath: string) => {
  try {
    /* const pdfPath = '1.pdf'; */
    const pdfData = fs.readFileSync(pdfPath);

    const pdfText = await extractPdfText(pdfData);

    // Collect BOE, WBS, and Task data
    const boeData = await extractProposalDetails(pdfText);
    const wbsData = await extractWbsDetails(pdfText, boeData.id);
    await extractTaskDetails(pdfText, wbsData.id);
  } catch (err) {
    console.error('Error:', err);
  }
  fs.unlink(pdfPath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log('File deleted successfully');
    }
  });
};
