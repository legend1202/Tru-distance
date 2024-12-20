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
import { useRouter } from 'src/routes/hooks';

import { DeleteFile, useGetFileLists } from 'src/api/filelist';

import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IFilelist } from 'src/types/upload';

import { RenderCellFilepath, RenderCellFileType, RenderCellProposalName } from '../user-table-row';

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// const JOB_SKILL_OPTIONS = ['Lead', 'Tech', 'Material', 'Travel', 'Cost'];
// ----------------------------------------------------------------------

export default function FileListView() {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const { fileList, fileLoading } = useGetFileLists();

  const [tableData, setTableData] = useState<IFilelist[]>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (fileList) {
      setTableData(fileList);
    }
  }, [fileList]);

  const handleShowRoleDelete = async (id: string) => {
    const result = await DeleteFile(id);
    if (result) {
      enqueueSnackbar('Deleted Successfully!');
      const filteredData = tableData.filter((row) => row.id !== id);
      setTableData(filteredData);
    }
    // setUser(user);
  };

  const handleDocumentAdd = () => {
    router.push(paths.boe_mng.data_import);
  };

  const columns: GridColDef[] = [
    {
      field: 'proposalId',
      headerName: 'Proposal Name',
      flex: 1,
      minWidth: 280,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellProposalName params={params} />,
    },
    {
      field: 'fileType',
      headerName: 'Type',
      minWidth: 280,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellFileType params={params} />,
    },
    {
      field: 'filepath',
      headerName: 'File path',
      minWidth: 280,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellFilepath params={params} />,
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
          label="Add"
          onClick={() => handleDocumentAdd()}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="Delete"
          onClick={() => handleShowRoleDelete(params.row.id)}
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
        heading="Files"
        links={[{ name: '' }]}
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
          loading={fileLoading}
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
