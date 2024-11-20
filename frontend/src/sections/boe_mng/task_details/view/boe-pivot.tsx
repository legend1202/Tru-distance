import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
import { Card, Stack, Button, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useGetWBSLists } from 'src/api/wbs';

import { RHFSelect } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITask } from 'src/types/wbs';

import NewGanttChart from '../ganttChat';
import ProposalSummaryView from '../proposal_summary_view';
import EvaluationSummaryView from '../evaluation_summary_view';
import ProposalPivotSelection from '../proposal_pivot-selection';
import EvaluationPivotSelection from '../evaluation_pivot_selection';
import { useRouter } from 'src/routes/hooks';
import WbsPivotTable from '../wbs_pivot_table';

// ----------------------------------------------------------------------

const tasks = [
  {
    name: 'Task 1',
    data: { Evaluator: 'Jan', TBD: '10', status: 'complete' },
    subtasks: [
      {
        name: 'Subtask 1.1',
        data: { Evaluator: 'Jan', TBD: '10', status: 'in-progress' },
      },
    ],
  },
  {
    name: 'Task 2',
    data: { Evaluator: 'Jan', TBD: '10', status: 'complete' },
  },
];

export default function BoePivotView() {
  const settings = useSettingsContext();

  const { wbsList } = useGetWBSLists();

  const [selectedTasks, setTasks] = useState<ITask[]>([]);

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

  const router = useRouter();

  const handleMoveToGannt = () => {
    router.push(paths.boe_mng.boe_gantt);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack component={Card} direction="row">
        <Card
          sx={{
            height: 1,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
            border: '1px solid #ccc',
          }}
        >
          <Stack
            sx={{
              flexGrow: { md: 1 },
              display: { md: 'flex' },
              flexDirection: { md: 'row' },
            }}
          >
            <ProposalPivotSelection />

            <EvaluationPivotSelection />
          </Stack>

          <Card
            sx={{
              height: '48px',
              mt: 2,
              flexGrow: { md: 1 },
              display: { md: 'flex' },
              flexDirection: { md: 'row' },
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{ py: 1, px: 2, color: 'white', backgroundColor: 'CornflowerBlue' }}
              onClick={handleMoveToGannt}
            >
              Return to Summary/GANNT
            </Button>
          </Card>
        </Card>
        <Card
          sx={{
            width: 0.6,
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
            <WbsPivotTable tasks={tasks} />
          </Card>
        </Card>
      </Stack>
    </Container>
  );
}
