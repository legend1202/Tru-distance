import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetWBSLists } from 'src/api/wbs';

import { RHFSelect } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITask } from 'src/types/wbs';

import GanttWithCurrentTime from '../ganttChat';

// ----------------------------------------------------------------------

export default function TaskDetailsView() {
  const settings = useSettingsContext();

  const { wbsList } = useGetWBSLists();

  const [selectedTasks, setTasks] = useState<ITask[]>([]);

  /* const [tableData, setTableData] = useState<IWbsSummary[]>([]); */

  /*  const [selectedWbsData, setWbsData] = useState<IWbs>(); */

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
      <CustomBreadcrumbs
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
      />

      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }}
      >
        {selectedTasks && <GanttWithCurrentTime tasksDataT={selectedTasks} />}
      </Card>
    </Container>
  );
}
