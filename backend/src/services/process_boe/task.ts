import { OriginTaskModel, Subtask } from '../../models/origin.task.model';
import { ProcessingTaskModel } from '../../models/process.task.model';
import { TaskDocument } from '../../models/task.model';
import { RequestError } from '../../utils/globalErrorHandler';

export const handleTaskDetails = async (
  tasksData: any[],
  proposalId: string,
  wbsId: string,
  clinId: string,
  boeId: string
) => {
  await OriginTaskModel.deleteMany({});
  await ProcessingTaskModel.deleteMany({});

  tasksData.map(async (taskElement, index) => {
    const taskData = {
      proposalId,
      wbsId,
      clinId,
      boeId,
      taskCode: index + 1,
      name: taskElement.name,
      periodOfPerformance: {
        start: taskElement?.start_date || '',
        end: taskElement?.end_date || '',
      },
      description: taskElement.description,
      hours: taskElement.hours,
      cost: taskElement.cost,
      material: taskElement.material,
      travel: taskElement.travel,
      moq: taskElement.moq,
      spread_totals: taskElement.spread_totals,
    };

    const newTask = new OriginTaskModel(taskData);
    const proccessingTask = new ProcessingTaskModel(taskData);

    await newTask.save();
    await proccessingTask.save();
  });
};
