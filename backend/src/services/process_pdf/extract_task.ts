import { OriginTaskModel, Subtask } from '../../models/origin.task.model';
import { ProcessingTaskModel } from '../../models/process.task.model';
import { RequestError } from '../../utils/globalErrorHandler';

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

const extractMoqWithRelation = async (text: string, sectionTitle: string) => {
  const sectionPattern = new RegExp(
    `${sectionTitle}:([\\s\\S]+?)(?=\\n[A-Z][a-zA-Z]+\\s*:|$)`,
    'g'
  );
  const sectionMatch = sectionPattern.exec(text);
  try {
    if (sectionMatch) {
      const sectionText = sectionMatch[1];

      // Extract basic MOQ details
      const equationMatch = sectionText.match(/MOQ Equation:\s*([\s\S]+?)\n/);
      const typeMatch = sectionText.match(/MOQ Type:\s*([\s\S]+?)\n/);
      const rationaleMatch = sectionText.match(
        /MOQ Rationale:\s*([\s\S]+?)(?=\n|$)/
      );

      // Extract nested relation details
      const descriptionMatch = sectionText.match(/Description:\s*([\s\S]+?)\n/);
      const actualHoursMatch = sectionText.match(
        /Actual Hours:\s*([\s\S]+?)\n/
      );
      const chargeNumberMatch = sectionText.match(
        /Charge Number\(s\):\s*([\s\S]+?)\n/
      );
      const contractNumberMatch = sectionText.match(
        /Contract Number:\s*([\s\S]+?)\n/
      );
      const reportNameMatch = sectionText.match(/Report Name:\s*([\s\S]+?)\n/);
      const dataCollectedDateMatch = sectionText.match(
        /Date Collected:\s*([\s\S]+?)\n/
      );
      const additionalSortFieldsMatch = sectionText.match(
        /Additional Sort Fields:\s*([\s\S]+?)\n/
      );
      const additionalNotesMatch = sectionText.match(
        /Additional Notes:\s*([\s\S]+?)\n/
      );

      // Period of performance details
      const startMatch = sectionText.match(/Time Span\s*([\s\S]+?)\s*-+/);
      const endMatch = sectionText.match(/-\s*([\s\S]+?)\n/);

      return {
        description: rationaleMatch ? rationaleMatch[1].trim() : 'Not Provided',
        equation: equationMatch ? equationMatch[1].trim() : 'Not Provided',
        moqType: typeMatch ? typeMatch[1].trim() : 'Not Provided',
        relation: {
          description: descriptionMatch
            ? descriptionMatch[1].trim()
            : 'Not Provided',
          actualHours: actualHoursMatch
            ? actualHoursMatch[1].trim()
            : 'Not Provided',
          chargeNumber: chargeNumberMatch
            ? chargeNumberMatch[1].trim()
            : 'Not Provided',
          contractNumber: contractNumberMatch
            ? contractNumberMatch[1].trim()
            : 'Not Provided',
          periodOfPerformance: {
            start: startMatch ? startMatch[1].trim() : '',
            end: endMatch ? endMatch[1].trim() : '',
          },
          reportName: reportNameMatch
            ? reportNameMatch[1].trim()
            : 'Not Provided',
          dataCollectedDate: dataCollectedDateMatch
            ? dataCollectedDateMatch[1].trim()
            : 'Not Provided',
          additionalSortFields: additionalSortFieldsMatch
            ? additionalSortFieldsMatch[1]
                .split(',')
                .map((field) => field.trim())
            : [],
          additionalNotes: additionalNotesMatch
            ? additionalNotesMatch[1].trim()
            : 'Not Provided',
        },
      };
    }
  } catch (error) {
    throw new RequestError(`Task with ID does not exist.`, 404);
  }
};

export const extractTaskDetails = async (
  text: string,
  proposalId: string,
  wbsId: string,
  clinId: string,
  boeId: string
) => {
  await OriginTaskModel.deleteMany({});
  await ProcessingTaskModel.deleteMany({});

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
    const taskMaterialMatches = [
      ...taskText.matchAll(/\$?(\d{1,3}(?:,\d{3})*)\s+material/gi),
    ];

    const taskTravelMatches = [
      ...taskText.matchAll(/\$?(\d{1,3}(?:,\d{3})*)\s+travel/gi),
    ];

    const taskMoqMatches = await extractMoqWithRelation(
      taskText,
      'Method of Quoting'
    );

    let taskHours =
      taskHoursMatches.length > 0
        ? parseNumber(taskHoursMatches.pop()![1])
        : null;
    let taskCosts =
      taskCostsMatches.length > 0
        ? parseNumber(taskCostsMatches.pop()![1])
        : null;

    let taskMaterials =
      taskMaterialMatches.length > 0
        ? parseNumber(taskMaterialMatches.pop()![1])
        : null;

    let taskTravels =
      taskTravelMatches.length > 0
        ? parseNumber(taskTravelMatches.pop()![1])
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
      const subtaskMaterialMatches = [
        ...subtaskText.matchAll(/(\d{1,3}(?:,\d{3})*)\s+material/gi),
      ];
      const subtaskTravelMatches = [
        ...subtaskText.matchAll(/\$?(\d{1,3}(?:,\d{3})*)\s+travel/gi),
      ];

      const moq = await extractMoqWithRelation(
        subtaskText,
        'Method of Quoting'
      ); // Extr

      const subtaskHours =
        subtaskHoursMatches.length > 0
          ? parseNumber(subtaskHoursMatches.pop()![1])
          : null;
      const subtaskCosts =
        subtaskCostsMatches.length > 0
          ? parseNumber(subtaskCostsMatches.pop()![1])
          : null;

      const subTaskMaterial =
        subtaskMaterialMatches.length > 0
          ? parseNumber(subtaskMaterialMatches.pop()![1])
          : null;
      const subtaskTravel =
        subtaskTravelMatches.length > 0
          ? parseNumber(subtaskTravelMatches.pop()![1])
          : null;

      const subtask: Subtask = {
        moq: moq || {},
        subtaskCode,
        name: subtaskName,
        description: subtaskText.trim(),
        hours: subtaskHours || 0,
        cost: subtaskCosts || 0,
        material: subTaskMaterial || 0,
        travel: subtaskTravel || 0,
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
      proposalId,
      wbsId,
      clinId,
      boeId,
      taskCode: match[1],
      name: match[2].trim(),
      periodOfPerformance: {
        start: parseDate(match[3]),
        end: parseDate(match[4]),
      },
      description: extractDescription(taskText, 'Description'),
      hours: taskHours,
      cost: taskCosts,
      material: taskMaterials,
      travel: taskTravels,
      moq: taskMoqMatches,
      subtasks,
    };

    const newTask = new OriginTaskModel(task);
    const proccessingTask = new ProcessingTaskModel(task);

    await newTask.save();
    await proccessingTask.save();
  }
};
