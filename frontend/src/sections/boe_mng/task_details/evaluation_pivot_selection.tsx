import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import { Card, MenuItem, Typography } from '@mui/material';

import { calculatePivotTotals } from 'src/utils/wbs-total';

import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { IWbs } from 'src/types/wbs';
import { ITask } from 'src/types/task';

type Props = {
  data: IWbs[];
};

const EvaluationPivotSelection = ({ data }: Props) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [subTasks, setSubTasks] = useState<ITask[]>([]);

  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTravel, setTotalTravel] = useState(0);
  const [totalMaterial, setTotalMaterial] = useState(0);

  useEffect(() => {
    if (tasks.length > 0) {
      const totals = calculatePivotTotals(tasks);
      setTotalHours(totals.totalHours);
      setTotalCost(totals.totalCost);
      setTotalTravel(totals.totalTravel);
      setTotalMaterial(totals.totalMaterial);
    }
  }, [tasks]);

  const WbsSchema = Yup.object().shape({
    wbsId: Yup.string().required('Wbs is required'),
    taskId: Yup.string(),
    subTaskId: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      wbsId: '',
      taskId: '',
      subTaskId: 0,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(WbsSchema),
    defaultValues,
  });

  const { setValue, watch } = methods;

  const values = watch();

  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
    }
  }, [data, setValue]);

  useMemo(() => {
    if (values.wbsId) {
      const filteredTasks = data.filter((wbs) => wbs._id === values.wbsId);
      setTasks(filteredTasks[0].tasks);
      setTaskList(filteredTasks[0].tasks);
    } else {
      setTasks([]);
      setTaskList([]);
      setSubTasks([]);
    }
  }, [values.wbsId, data]);

  useMemo(() => {
    if (values.taskId) {
      const filteredTasks = taskList.filter((task) => task.id === values.taskId);
      setTasks(filteredTasks);
    }
  }, [values.taskId, taskList]);

  return (
    <Card
      sx={{
        p: 3,
        border: '1px solid #ccc',
      }}
    >
      <Typography align="center">PIVOT Data Entry - Evaluation</Typography>
      <Stack
        sx={{
          my: 3,
        }}
      >
        <FormProvider methods={methods}>
          <Card
            sx={{
              p: 1,
            }}
          >
            <RHFSelect
              name="wbsId"
              label="WBS Code"
              fullWidth
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              sx={{ minWidth: 140 }}
            >
              {data &&
                data.map((wbs) => (
                  <MenuItem key={wbs._id} value={wbs._id}>
                    {wbs.wbsTitle}
                  </MenuItem>
                ))}
            </RHFSelect>
          </Card>
          <Card
            sx={{
              p: 1,
            }}
          >
            <RHFSelect
              name="taskId"
              label="Task"
              fullWidth
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              sx={{ minWidth: 140 }}
            >
              {taskList &&
                taskList.map((task) => (
                  <MenuItem key={task.id} value={task.id}>
                    {task.name}
                  </MenuItem>
                ))}
            </RHFSelect>
          </Card>
          <Card
            sx={{
              p: 1,
            }}
          >
            <RHFSelect
              name="subTaskIdOfEval"
              label="Subtask"
              fullWidth
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              sx={{ minWidth: 140 }}
            >
              {subTasks &&
                subTasks.map((subTask, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {subTask.name}
                  </MenuItem>
                ))}
            </RHFSelect>
          </Card>
        </FormProvider>
      </Stack>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Hours: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalHours}</Typography>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Cost: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalCost}</Typography>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Material: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalMaterial}</Typography>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Travel : </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalTravel}</Typography>
      </Card>
    </Card>
  );
};
export default EvaluationPivotSelection;
