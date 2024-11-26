import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import { Card, MenuItem, Typography } from '@mui/material';

import { calculateTotals } from 'src/utils/wbs-total';

import { useGetWBSLists } from 'src/api/wbs';

import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { ISubtask, IOriginData } from 'src/types/gantt';

type Props = {
  data: IOriginData[];
};

const ProposalPivotSelection = ({ data }: Props) => {
  const { wbsList } = useGetWBSLists();

  const [tasks, setTasks] = useState<IOriginData[] | ISubtask[]>([]);
  const [taskList, setTaskList] = useState<IOriginData[]>([]);
  const [subTasks, setSubTasks] = useState<ISubtask[]>([]);

  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTravel, setTotalTravel] = useState(0);
  const [totalMaterial, setTotalMaterial] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setTasks(data);
    }
  }, [data]);

  useEffect(() => {
    if (tasks.length > 0) {
      const totals = calculateTotals(tasks);
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
    if (wbsList.length > 0) {
      setValue('wbsId', wbsList[0].id);
    }
  }, [wbsList, setValue]);

  useMemo(() => {
    if (values.wbsId) {
      const filteredTasks = data.filter((task) => task.wbsId === values.wbsId);
      setTasks(filteredTasks);
      setTaskList(filteredTasks);
    } else {
      setTasks([]);
      setTaskList([]);
    }
  }, [values.wbsId, data]);

  useMemo(() => {
    if (values.taskId) {
      const filteredTasks = data.filter((task) => task.id === values.taskId);
      setTasks(filteredTasks);
      if (filteredTasks[0].subtasks?.length > 0) {
        setSubTasks(filteredTasks[0].subtasks);
      } else {
        setSubTasks([]);
      }
    }
  }, [values.taskId, data]);

  useMemo(() => {
    if (values.subTaskId) {
      const filteredTasks = data.filter((task) => task.id === values.taskId);
      if (values.taskId && filteredTasks[0].subtasks?.length > 0) {
        const subtask = filteredTasks[0].subtasks[values.subTaskId - 1];
        setTasks([subtask]);
      } else {
        setSubTasks([]);
      }
    }
  }, [values.subTaskId, values.taskId, data]);

  return (
    <Card
      sx={{
        p: 3,
        border: '1px solid #ccc',
      }}
    >
      <Typography align="center">PIVOT Data Entry - Proposed</Typography>
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
              {wbsList &&
                wbsList.map((wbs) => (
                  <MenuItem key={wbs.id} value={wbs.id}>
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
              name="subTaskId"
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
export default ProposalPivotSelection;
