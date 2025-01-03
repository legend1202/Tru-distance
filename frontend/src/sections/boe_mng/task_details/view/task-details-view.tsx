import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Card, Stack, Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useGetBoeLists } from 'src/api/boe';
import { useGetClinLists } from 'src/api/cline';
import { useGetGanttData } from 'src/api/ganttData';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { IWbs } from 'src/types/wbs';
import { IClin } from 'src/types/clin';
import { IPeriodOfPerformance } from 'src/types/flowData';

import NewGanttChart from '../ganttChat';
import ProposalSummaryView from '../proposal_summary_view';
import EvaluationSummaryView from '../evaluation_summary_view';

// ----------------------------------------------------------------------

export default function TaskDetailsView() {
  // const settings = useSettingsContext();

  const [monthFlag, setMonthFlag] = useState<boolean>(true);

  const { ganttData } = useGetGanttData();
  const { clinList } = useGetClinLists();
  const { boeList } = useGetBoeLists();

  const [proposaedData, setProposedData] = useState<IWbs[]>([]);
  const [evaluationData, setEvaluationData] = useState<IWbs[]>([]);
  const [clins, setClins] = useState<IClin[]>([]);
  const [workPeriod, setWorkPeriod] = useState<IPeriodOfPerformance>();

  const handleCalendarChange = (value: boolean) => {
    setMonthFlag(value);
  };

  useEffect(() => {
    if (ganttData?.originData && ganttData?.evaluationData) {
      setProposedData(ganttData.originData);
      setEvaluationData(ganttData.evaluationData);
    }
  }, [ganttData]);

  useEffect(() => {
    if (clinList.length > 0) {
      setClins(clinList);
    }
  }, [clinList]);

  useEffect(() => {
    if (boeList.length > 0) {
      setWorkPeriod({ start: boeList[0].boeStartDate, end: boeList[0].boeEnddate });
    }
  }, [boeList]);

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading="Task Details"
        links={[
          { name: 'BOE', href: paths.boe_mng.root },
          { name: 'Tasks', href: paths.boe_mng.wbs_summary },
          { name: 'Details' },
        ]}
        // action={
        //   <FormProvider methods={methods}>
        //     <RHFSelect
        //       name="wbsId"
        //       label="WBS Code"
        //       fullWidth
        //       InputLabelProps={{ shrink: true }}
        //       PaperPropsSx={{ textTransform: 'capitalize' }}
        //       sx={{ minWidth: 140 }}
        //     >
        //       {wbsList &&
        //         wbsList.map((wbs) => (
        //           <MenuItem key={wbs.id} value={wbs.id}>
        //             {wbs.title}
        //           </MenuItem>
        //         ))}
        //     </RHFSelect>
        //   </FormProvider>
        // }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack component={Card} direction="row">
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: 240,
          }}
        >
          <ProposalSummaryView proposaedData={proposaedData} clins={clins} />

          <EvaluationSummaryView evaluationData={evaluationData} clins={clins} />
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
            <NewGanttChart tasks={evaluationData} monthFlag={monthFlag} workPeriod={workPeriod} />
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
