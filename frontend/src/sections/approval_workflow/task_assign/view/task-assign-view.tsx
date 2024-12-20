import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
import { Card, Stack, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';

import { haveCommonItem } from 'src/utils/role-check';

import { useGetWBSLists } from 'src/api/wbs';
import { useGetUserLists } from 'src/api/admin';

import { RHFSelect } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITask } from 'src/types/task';
import { IUserItem } from 'src/types/user';

import UserListView from '../user-list-view';
import TaskAssignListView from '../task-assign-list';
// ----------------------------------------------------------------------

export default function TaskAssignView() {
  const settings = useSettingsContext();

  const { users } = useGetUserLists();

  const { wbsList } = useGetWBSLists();

  const [tasks, setTasks] = useState<ITask[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const [evaluators, setEvaluators] = useState<IUserItem[]>([]);

  const [childKey, setChildKey] = useState(0);

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

  const { setValue, watch } = methods;

  const values = watch();

  useEffect(() => {
    if (wbsList.length > 0) {
      setValue('wbsId', wbsList[0]._id);
    }
  }, [wbsList, setValue]);

  useEffect(() => {
    if (users.length > 0) {
      const filteredUsers = users.filter((user) =>
        haveCommonItem(['Tech', 'Material', 'Travel', 'Cost'], user.role)
      );
      setEvaluators(filteredUsers);
      setSelectedUserId(filteredUsers[0].id);
    } else {
      setEvaluators([]);
      setSelectedUserId('');
    }
  }, [users]);

  useEffect(() => {
    setChildKey((prevKey) => prevKey + 1); // Update key to force re-render
  }, [selectedUserId, values.wbsId]);

  const handleSelectedUserId = (userId: string) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    if (wbsList.length > 0) {
      const filteredWbs = wbsList.filter((wbs) => wbs._id === values.wbsId);
      if (filteredWbs[0]?.tasks) {
        setTasks(filteredWbs[0].tasks);
      }
    }
  }, [wbsList, values.wbsId]);

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
                  <MenuItem key={wbs._id} value={wbs._id}>
                    {wbs.wbsTitle}
                  </MenuItem>
                ))}
            </RHFSelect>
          </FormProvider>
        }
      />
      <Stack component={Card} direction="row" justifyContent="space-between">
        <UserListView
          users={evaluators}
          selectedUserId={selectedUserId}
          handleSelectedUserId={handleSelectedUserId}
        />

        <TaskAssignListView key={childKey} data={tasks} selectedUserId={selectedUserId} />
      </Stack>
    </Container>
  );
}
