import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, Card, Chip, Stack, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { UserRoleUpdate, useGetUserLists } from 'src/api/admin';

import Iconify from 'src/components/iconify/iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITUserItem } from 'src/types/user';

import { RenderCellName, RenderCellRole, RenderCellEmail } from '../user-table-row';

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

const JOB_SKILL_OPTIONS = ['Lead', 'Tech', 'Material', 'Travel', 'Cost'];
// ----------------------------------------------------------------------

export default function UsersListView() {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const { users, usersLoading } = useGetUserLists();

  const [currentUser, setUser] = useState<ITUserItem>();

  const [tableData, setTableData] = useState<ITUserItem[]>([]);

  const [openForm, setOpenForm] = useState<boolean>(false);

  const [reset, setReset] = useState(false);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (users) {
      setTableData(users);
    }
  }, [users]);

  const handleShowRoleModal = (user: ITUserItem) => {
    setOpenForm(true);
    setUser(user);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 280,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellName params={params} />,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 280,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellEmail params={params} />,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 280,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellRole params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="Assign"
          onClick={() => handleShowRoleModal(params.row)}
        />,
      ],
    },
  ];

  const NewJobSchema = Yup.object().shape({
    role: Yup.array()
      .of(Yup.string().required('Each role must be a string')) // Ensures each item in the array is a string
      .min(1, 'Choose at least one option'), // Validates that at least one role is selected
  });

  const defaultValues = useMemo(
    () => ({
      role: currentUser?.role || [],
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const onCloseForm = () => {
    setOpenForm(false);
  };

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser?.role) {
      setValue('role', currentUser?.role);
    }
  }, [currentUser, defaultValues, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setOpenForm(false);

      if (currentUser?.id) {
        const updateData = { id: currentUser.id, role: data.role as string[] };
        const result = await UserRoleUpdate(updateData);
        if (result.data.success) {
          enqueueSnackbar('update_success');
          const updatedUsers = tableData.map((user) => {
            if (user.id === result.data.result.id)
              return { ...user, role: result.data.result.role };
            return user;
          });
          setTableData([...updatedUsers]);
          setReset(!reset);
        } else {
          enqueueSnackbar('Update did not success');
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const renderProperties = (
    <Card>
      <Stack spacing={3} sx={{ py: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        >
          <RHFAutocomplete
            name="role"
            placeholder="+ Roles"
            multiple
            disableCloseOnSelect
            options={JOB_SKILL_OPTIONS.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="info"
                  variant="soft"
                />
              ))
            }
          />
        </Box>
      </Stack>
    </Card>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Role Assignment"
          links={[
            { name: 'Admin', href: paths.admin.root },
            { name: 'Users', href: paths.admin.userslist },
            { name: 'List' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card
          sx={{
            height: { xs: 800 },
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={tableData}
            columns={columns}
            loading={usersLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <GridToolbarContainer>
                  <GridToolbarQuickFilter />
                </GridToolbarContainer>
              ),
              noRowsOverlay: () => <EmptyContent title="No Data" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              },
            }}
          />
        </Card>
      </Container>
      <Dialog fullWidth maxWidth="md" open={openForm} onClose={onCloseForm}>
        <DialogTitle sx={{ minHeight: 76 }}>Assign Roles</DialogTitle>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3} sx={{ px: 3 }}>
            {renderProperties}
          </Stack>
          <DialogActions>
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="outlined" color="inherit" onClick={onCloseForm}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
