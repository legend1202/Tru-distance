import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Card, Stack, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetGanttData } from 'src/api/ganttData';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { IOriginData, IEvaluationData } from 'src/types/gantt';

import WbsPivotTable from '../wbs_pivot_table';
import ProposalPivotSelection from '../proposal_pivot-selection';
import EvaluationPivotSelection from '../evaluation_pivot_selection';

// ----------------------------------------------------------------------

export default function BoePivotView() {
  const settings = useSettingsContext();

  const { ganttData } = useGetGanttData();

  const [proposaedData, setProposedData] = useState<IOriginData[]>([]);
  const [evaluationData, setEvaluationData] = useState<IEvaluationData[]>([]);

  useEffect(() => {
    if (ganttData?.originData && ganttData?.evaluationData) {
      setProposedData(ganttData.originData);
      setEvaluationData(ganttData.evaluationData);
    }
  }, [ganttData]);

  const router = useRouter();

  const handleMoveToGannt = () => {
    router.push(paths.boe_mng.boe_gantt);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Pivot"
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
            <ProposalPivotSelection data={proposaedData} />

            <EvaluationPivotSelection data={evaluationData} />
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
            <WbsPivotTable tasks={evaluationData} />
          </Card>
        </Card>
      </Stack>
    </Container>
  );
}
