import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import { Card } from '@mui/material';
import Container from '@mui/material/Container';
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
import { useSettingsContext } from 'src/components/settings';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITUserItem } from 'src/types/user';

import { RenderCellName, RenderCellRole, RenderCellEmail } from '../user-table-row';

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function UsersListView() {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const { users, usersLoading } = useGetUserLists();

  const [tableData, setTableData] = useState<ITUserItem[]>([]);

  const [reset, setReset] = useState(false);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (users) {
      setTableData(users);
    }
  }, [users]);

  const handleUpdateRoleRow = async (id: string, role: string) => {
    const updateData = { id, role };
    const result = await UserRoleUpdate(updateData);
    if (result.data.success) {
      enqueueSnackbar('update_success');
      const updatedUsers = tableData.map((user) => {
        if (user.id === result.data.result.id) return { ...user, role: result.data.result.role };
        return user;
      });
      setTableData([...updatedUsers]);
      setReset(!reset);
    } else {
      enqueueSnackbar('Update did not success');
    }
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
          label="Lead"
          onClick={() => handleUpdateRoleRow(params.row.id, 'Lead')}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Tech"
          onClick={() => handleUpdateRoleRow(params.row.id, 'Tech')}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Material"
          onClick={() => handleUpdateRoleRow(params.row.id, 'Material')}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Travel"
          onClick={() => handleUpdateRoleRow(params.row.id, 'Travel')}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Users"
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
  );
}
