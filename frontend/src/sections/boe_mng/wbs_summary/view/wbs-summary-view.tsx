import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card } from '@mui/material';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridColDef,
  GridRowClassNameParams,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { useGetWBSLists } from 'src/api/wbs';

import { useSettingsContext } from 'src/components/settings';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IWbsTask } from 'src/types/wbs';

import { RenderCellName, RenderCellHours, RenderCellCosts } from '../wbs-summary-table-row';

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

const getRowClassName = (params: GridRowClassNameParams) => {
  if (params.row.status === 0) {
    // Example condition based on 'hours' value
    return 'highlight-row'; // Class name to apply
  }
  if (params.row.status === 2) {
    // Example condition based on 'hours' value
    return 'highlight-total-row'; // Class name to apply
  }
  return '';
};

// ----------------------------------------------------------------------

export default function WbsSummaryView() {
  const settings = useSettingsContext();

  const { wbsList, wbsLoading } = useGetWBSLists();

  const [tableData, setTableData] = useState<IWbsTask[]>([]);

  // const [selectedWbsData, setWbsData] = useState<IWbs>();

  // const [totalHours, setTotalHours] = useState(0);

  // const [totalCosts, setTotalCosts] = useState(0);

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
      let tempTableData: IWbsTask[] = [];
      const filterTableData = () => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let totalHours = 0;
        let totalCost = 0;
        wbsList.forEach((wbsData) => {
          const tempTasks: IWbsTask[] = [];
          let hours = 0;
          let cost = 0;

          wbsData.tasks.forEach((wbsTaskData) => {
            hours += Number(wbsTaskData.hours);
            cost += Number(wbsTaskData.cost);
            const tempTask = {
              id: wbsTaskData.id,
              name: `Task ${wbsTaskData.taskCode}: ${wbsTaskData.name}`,
              hours: wbsTaskData.hours,
              cost: wbsTaskData.cost,
              status: 1,
            };
            tempTasks.push(tempTask);
          });
          tempTasks.unshift({
            id: wbsData.wbsTitle,
            name: `${wbsData.wbsNumber}   ${wbsData.wbsTitle}`,
            hours,
            cost,
            status: 0,
          });
          totalHours += hours;
          totalCost += cost;
          tempTableData = [...tempTableData, ...tempTasks];
        });
        tempTableData.push({
          id: 'total',
          name: 'Total',
          hours: totalHours,
          cost: totalCost,
          status: 2,
        });
      };
      filterTableData();
      setTableData(tempTableData);
      // setWbsData(wbsList[0]);
      setValue('wbsId', wbsList[0]._id);
    }
  }, [wbsList, setValue]);

  // useEffect(() => {
  //   if (selectedWbsData) {
  //     const total = calculateWBSTotals(selectedWbsData);
  //     setTotalHours(total.totalHours);
  //     setTotalCosts(total.totalCost);
  //   }
  // }, [selectedWbsData]);

  const columns: GridColDef[] = [
    {
      field: 'taskName',
      headerName: 'WBS / Task',
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
      headerName: 'Material Cost',
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
        //             {wbs.wbsTitle}
        //           </MenuItem>
        //         ))}
        //     </RHFSelect>
        //   </FormProvider>
        // }
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
            getRowClassName={getRowClassName}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              // toolbar: () => (
              //   <GridToolbarContainer>
              //     {/* <GridToolbarQuickFilter /> */}
              //     <Stack spacing={0.5}>
              //       <Card
              //         sx={{
              //           px: 2,
              //         }}
              //       >
              //         <Typography variant="subtitle1">Total Hours</Typography>

              //         <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
              //           {totalHours}
              //         </Box>
              //       </Card>
              //     </Stack>
              //     <Stack spacing={0.5}>
              //       <Card
              //         sx={{
              //           px: 2,
              //         }}
              //       >
              //         <Typography variant="subtitle1">Total Costs</Typography>

              //         <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
              //           {totalCosts}
              //         </Box>
              //       </Card>
              //     </Stack>
              //   </GridToolbarContainer>
              // ),
              noRowsOverlay: () => <EmptyContent title="No Data" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              },
            }}
            sx={{
              '& .highlight-row': {
                backgroundColor: 'grey', // Yellow background color for rows with more than 100 hours
              },
              '& .highlight-total-row': {
                backgroundColor: '#227acb', // Yellow background color for rows with more than 100 hours
              },
            }}
          />
        )}
      </Card>
    </Container>
  );
}
