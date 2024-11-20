import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
import { Card, Stack, Button } from '@mui/material';

import { useGetWBSLists } from 'src/api/wbs';

import { useSettingsContext } from 'src/components/settings';

import { ITask } from 'src/types/wbs';

import NewGanttChart from '../ganttChat';
import ProposalSummaryView from '../proposal_summary_view';
import EvaluationSummaryView from '../evaluation_summary_view';

// ----------------------------------------------------------------------

const tasks = [
  {
    name: 'Task 1',
    data: [
      { month: 'Jan', value: 10, status: 'complete' },
      { month: 'Feb', value: 20, status: 'in-progress' },
    ],
    subtasks: [
      {
        name: 'Subtask 1.1',
        data: [
          { month: 'Jan', value: 5, status: 'complete' },
          { month: 'Mar', value: 15, status: 'in-progress' },
        ],
      },
    ],
  },
  {
    name: 'Task 2',
    data: [
      { month: 'Mar', value: 40, status: 'complete' },
      { month: 'Apr', value: 40, status: 'complete' },
      { month: 'May', value: 40, status: 'complete' },
      { month: 'Jun', value: 40, status: 'complete' },
      { month: 'Aug', value: 40, status: 'in-progress' },

      { month: 'Sep', value: 40, status: 'in-progress' },
      { month: 'Oct', value: 40, status: 'in-progress' },
      { month: 'Nov', value: 40, status: 'in-progress' },
    ],
  },
];

export default function TaskDetailsView() {
  const settings = useSettingsContext();

  const { wbsList } = useGetWBSLists();

  const [selectedTasks, setTasks] = useState<ITask[]>([]);

  const [monthFlag, setMonthFlag] = useState<boolean>(true);

  const handleCalendarChange = (value: boolean) => {
    setMonthFlag(value);
  };

  const WbsSchema = Yup.object().shape({
    wbsId: Yup.string().required('Wbs is required'),
  });

  const defaultValues = useMemo(
    () => ({
      wbsId: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(WbsSchema),
    defaultValues,
  });

  const { setValue } = methods;

  /* const values = watch();  */

  useEffect(() => {
    if (wbsList.length > 0) {
      setTasks(wbsList[0].tasks);
      setValue('wbsId', wbsList[0].id);
    }
  }, [wbsList, setValue]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="Task Details"
        links={[
          { name: 'BOE', href: paths.boe_mng.root },
          { name: 'Tasks', href: paths.boe_mng.wbs_summary },
          { name: 'Details' },
        ]}
        action={
          <FormProvider methods={methods}>
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
                    {wbs.title}
                  </MenuItem>
                ))}
            </RHFSelect>
          </FormProvider>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}

      <Stack component={Card} direction="row">
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: 320,
          }}
        >
          <ProposalSummaryView />

          <EvaluationSummaryView />
        </Stack>
        <Card
          sx={{
            pt: 2,
            pb: 3,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
            border: '1px solid #ccc',
          }}
        >
          <Card
            sx={{
              height: 1,
              flexGrow: { md: 1 },
              display: { md: 'flex' },
              flexDirection: { md: 'row' },
              justifyContent: 'space-around',
            }}
          >
            <NewGanttChart tasks={tasks} monthFlag={monthFlag} />
          </Card>
          <Card
            sx={{
              mt: 2,
              height: '48px',
              flexGrow: { md: 1 },
              display: { md: 'flex' },
              flexDirection: { md: 'row' },
              justifyContent: 'space-around',
            }}
          >
            <Button
              sx={{ py: 1, px: 2, color: 'white', backgroundColor: 'CornflowerBlue' }}
              onClick={() => handleCalendarChange(false)}
            >
              Roll-up by Fiscal Year
            </Button>
            <Button
              sx={{ py: 1, px: 2, color: 'white', backgroundColor: 'CornflowerBlue' }}
              onClick={() => handleCalendarChange(true)}
            >
              Roll-up by Calendar Year
            </Button>
          </Card>
        </Card>
      </Stack>
    </Container>
  );
}
