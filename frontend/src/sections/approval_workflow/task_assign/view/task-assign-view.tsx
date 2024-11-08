import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
import { Card, Stack, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useGetWBSLists } from 'src/api/wbs';
import { useGetUserLists } from 'src/api/admin';

import { RHFSelect } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITask } from 'src/types/wbs';

import UserListView from '../../user-list-view';
import TaskAssignListView from '../../task-assign-list';

// ----------------------------------------------------------------------

export default function TaskAssignView() {
  const settings = useSettingsContext();

  const { users } = useGetUserLists();

  const { wbsList } = useGetWBSLists();

  const [tasks, setTasks] = useState<ITask[]>([]);

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
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomBreadcrumbs
        heading="Task Assign"
        links={[{ name: 'TAsk', href: paths.approval_workflow.task_assign }, { name: 'Assign' }]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
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
      />
      <Stack component={Card} direction="row" justifyContent="space-between">
        <UserListView users={users} />
        <TaskAssignListView tasks={tasks} />
      </Stack>
    </Container>
  );
}
