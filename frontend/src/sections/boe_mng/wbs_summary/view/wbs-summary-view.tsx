import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Stack } from '@mui/system';
import Container from '@mui/material/Container';
import { Card, MenuItem, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { calculateWBSTotals } from 'src/utils/wbs-total';

import { useGetWBSLists } from 'src/api/wbs';

import { RHFSelect } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IWbs } from 'src/types/wbs';
import { IOriginData } from 'src/types/gantt';

import { RenderCellName, RenderCellHours, RenderCellCosts } from '../wbs-summary-table-row';

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function WbsSummaryView() {
  const settings = useSettingsContext();

  const { wbsList, wbsLoading } = useGetWBSLists();

  const [tableData, setTableData] = useState<IOriginData[]>([]);

  const [selectedWbsData, setWbsData] = useState<IWbs>();

  const [totalHours, setTotalHours] = useState(0);

  const [totalCosts, setTotalCosts] = useState(0);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

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

  /* const values = watch(); */

  useEffect(() => {
    if (wbsList.length > 0) {
      setTableData(wbsList[0].tasks);
      setWbsData(wbsList[0]);
      setValue('wbsId', wbsList[0].id);
    }
  }, [wbsList, setValue]);

  useEffect(() => {
    if (selectedWbsData) {
      const total = calculateWBSTotals(selectedWbsData);
      setTotalHours(total.totalHours);
      setTotalCosts(total.totalCost);
    }
  }, [selectedWbsData]);

  const columns: GridColDef[] = [
    {
      field: 'taskName',
      headerName: 'Task',
      flex: 1,
      minWidth: 280,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellName params={params} />,
    },
    {
      field: 'hours',
      headerName: 'Hours',
      minWidth: 280,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellHours params={params} />,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      minWidth: 280,
      disableColumnMenu: true,
      renderCell: (params) => <RenderCellCosts params={params} />,
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="WBS Summary"
        links={[
          { name: 'BOE', href: paths.boe_mng.root },
          { name: 'WBS', href: paths.boe_mng.wbs_summary },
          { name: 'Summary' },
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
                    {wbs.wbsTitle}
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
        {tableData && (
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={tableData}
            columns={columns}
            loading={wbsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <GridToolbarContainer>
                  {/* <GridToolbarQuickFilter /> */}
                  <Stack spacing={0.5}>
                    <Card
                      sx={{
                        px: 2,
                      }}
                    >
                      <Typography variant="subtitle1">Total Hours</Typography>

                      <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
                        {totalHours}
                      </Box>
                    </Card>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Card
                      sx={{
                        px: 2,
                      }}
                    >
                      <Typography variant="subtitle1">Total Costs</Typography>

                      <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
                        {totalCosts}
                      </Box>
                    </Card>
                  </Stack>
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
        )}
      </Card>
    </Container>
  );
}
