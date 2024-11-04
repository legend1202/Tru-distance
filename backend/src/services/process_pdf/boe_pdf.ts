import fs from 'fs';
import pdfParse from 'pdf-parse';
import { BoeDocument, BoeModel } from '../../models/boe.model';
import { ClientSession } from 'mongoose';
import { WBSDocument, WbsModel } from '../../models/wbs.model';
import { TaskDocument, TaskModel } from '../../models/task.model';

interface PeriodOfPerformance {
  start: string | null;
  end: string | null;
}

interface BoeData {
  name: string;
  title: string;
  proposalName: string;
  createdBy: string;
  periodOfPerformance: PeriodOfPerformance;
  description: string;
}

interface Task {
  taskCode: string;
  name: string;
  periodOfPerformance: PeriodOfPerformance;
  description: string;
  hours: number | null;
  cost: number | null;
  subtasks: Subtask[];
}

interface Subtask {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number | null;
  cost: number | null;
}

interface WbsData {
  title: string | null;
  wbsCode: string | null;
  tasks: Array<{
    taskCode: string;
    name: string;
    periodOfPerformance: PeriodOfPerformance;
  }>;
}

// Load the PDF
/* const pdfPath = '1.pdf'; */
/* const pdfData = fs.readFileSync(pdfPath); */

const extractPdfText = async (pdfData: Buffer): Promise<string> => {
  const data = await pdfParse(pdfData);
  return data.text;
};

// Helper function to parse date in MM/YYYY format
const parseDate = (dateStr: string): string | null => {
  const dateParts = dateStr.match(/(\d{2})\/(\d{4})/);
  if (dateParts) {
    const [, month, year] = dateParts;
    return new Date(`${year}-${month}-01`).toISOString();
  }
  return null;
};

const extractDescription = (text: string, keyword: string): string => {
  const descriptionPattern = new RegExp(
    `${keyword}:\\s*([\\s\\S]+?)(?=\\n[A-Z][a-zA-Z]+:|$)`,
    'g'
  );
  const match = descriptionPattern.exec(text);
  return match ? match[1].trim() : 'Description not found';
};

// Function to convert comma-separated numbers to integers
const parseNumber = (numStr: string): number => {
  return parseInt(numStr.replace(/,/g, ''), 10);
};

// Define functions to extract specific fields
const extractProposalDetails = async (
  text: string,
  session?: ClientSession
): Promise<BoeDocument> => {
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
    /* description:
      'The tasks described in this Basis of Estimate (BOE) are in support of Contract Work Breakdown Structure (CWBS) element 1.2.3.4 Party Support.', */
    description: extractDescription(text, 'BOE Description'),
  };
  const newBoe = new BoeModel(boeData);
  await newBoe.save({ session });
  return newBoe;
};

const extractWbsDetails = async (
  text: string,
  boeId: string
): Promise<WBSDocument> => {
  await WbsModel.deleteMany({});

  const wbsTitleMatch = text.match(/WBS Title:\s*(.+)/);
  const wbsCodeMatch = text.match(/WBS\s+#:\s*(\d+\.\d+\.\d+\.\d+)/);

  const tasks = [];
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

  const taskPattern =
    /Task (\d+): (.+?)\nStart Date:\s*(\d{2}\/\d{4})\s*End Date:\s*(\d{2}\/\d{4})([\s\S]+?)(?=Task \d+:|$)/g;
  let match;

  while ((match = taskPattern.exec(text)) !== null) {
    const taskText = match[5];

    const taskHoursMatches = [
      ...taskText.matchAll(/(\d{1,3}(?:,\d{3})*)\s+hours/gi),
    ];
    const taskCostsMatches = [
      ...taskText.matchAll(/\$?(\d{1,3}(?:,\d{3})*)\s+cost/gi),
    ];
    let taskHours =
      taskHoursMatches.length > 0
        ? parseNumber(taskHoursMatches.pop()![1])
        : null;
    let taskCosts =
      taskCostsMatches.length > 0
        ? parseNumber(taskCostsMatches.pop()![1])
        : null;

    const subtaskPattern =
      /Subtask (\d+): (.+?)\n([\s\S]+?)(?=Subtask \d+:|$)/g;
    const subtasksMap: Record<string, Subtask> = {};
    let subtaskMatch;

    let hasSubtasks = false;

    while ((subtaskMatch = subtaskPattern.exec(taskText)) !== null) {
      const subtaskCode = subtaskMatch[1].trim();
      const subtaskName = subtaskMatch[2].trim();
      const subtaskText = subtaskMatch[3];

      const subtaskHoursMatches = [
        ...subtaskText.matchAll(/(\d{1,3}(?:,\d{3})*)\s+hours/gi),
      ];
      const subtaskCostsMatches = [
        ...subtaskText.matchAll(/\$?(\d{1,3}(?:,\d{3})*)\s+cost/gi),
      ];
      const subtaskHours =
        subtaskHoursMatches.length > 0
          ? parseNumber(subtaskHoursMatches.pop()![1])
          : null;
      const subtaskCosts =
        subtaskCostsMatches.length > 0
          ? parseNumber(subtaskCostsMatches.pop()![1])
          : null;

      const subtask: Subtask = {
        subtaskCode,
        name: subtaskName,
        description: subtaskText.trim(),
        hours: subtaskHours,
        cost: subtaskCosts,
      };

      subtasksMap[subtaskCode] = subtask;
      hasSubtasks = true;
    }

    const subtasks = Object.values(subtasksMap);

    // Calculate total hours and costs for subtasks after all subtasks are parsed
    const totalSubtaskHours = subtasks.reduce(
      (acc, subtask) => acc + (subtask.hours ?? 0),
      0
    );
    const totalSubtaskCosts = subtasks.reduce(
      (acc, subtask) => acc + (subtask.cost ?? 0),
      0
    );

    // Update task hours and cost based on subtasks' totals if subtasks exist
    if (hasSubtasks) {
      taskHours = totalSubtaskHours;
      taskCosts = totalSubtaskCosts;
    }

    const task = {
      wbsId,
      taskCode: match[1],
      name: match[2].trim(),
      periodOfPerformance: {
        start: parseDate(match[3]),
        end: parseDate(match[4]),
      },
      description: extractDescription(taskText, 'Description'),
      hours: taskHours,
      cost: taskCosts,
      subtasks,
    };

    const newTask = new TaskModel(task);

    await newTask.save();
  }
};

// Main function to extract and save data
export const processBoeFunc = async (pdfPath: string) => {
  try {
    /* const pdfPath = '1.pdf'; */
    const pdfData = fs.readFileSync(pdfPath);

    const pdfText = await extractPdfText(pdfData);

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
