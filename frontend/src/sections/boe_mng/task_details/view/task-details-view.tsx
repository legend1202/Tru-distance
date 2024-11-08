import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
import { Card, Stack, Button, MenuItem, Typography } from '@mui/material';

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

      <Stack component={Card} direction="row">
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: 320,
          }}
        >
          <Card
            sx={{
              p: 3,
            }}
          >
            <Typography align="center">Proposal Summary</Typography>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Hours: </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Cost: </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Material: </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Travel : </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Typography
              sx={{
                mt: 3,
              }}
            >
              Total Hours By CLIN:{' '}
            </Typography>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
              }}
            >
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 001: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 002: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
                  {' '}
                  555
                </Typography>
              </Card>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
              }}
            >
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 003: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 004: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
                  {' '}
                  555
                </Typography>
              </Card>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
              }}
            >
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 005: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 006: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
                  {' '}
                  555
                </Typography>
              </Card>
            </Card>
          </Card>

          <Card
            sx={{
              p: 3,
            }}
          >
            <Typography align="center">Evaluation Summary</Typography>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Hours: </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Cost: </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Material: </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Travel : </Typography>
              <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
            </Card>
            <Typography
              sx={{
                mt: 3,
              }}
            >
              Total Hours By CLIN:{' '}
            </Typography>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
              }}
            >
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 001: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 002: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
                  {' '}
                  555
                </Typography>
              </Card>
            </Card>
            <Card
              sx={{
                flexGrow: { md: 1 },
                display: { md: 'flex' },
                flexDirection: { md: 'row' },
              }}
            >
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 003: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: { md: 1 },
                  display: { md: 'flex' },
                  flexDirection: { md: 'row' },
                }}
              >
                <Typography>CLIN 004: </Typography>
                <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
                  {' '}
                  555
                </Typography>
              </Card>
            </Card>
          </Card>

          <Button color="success">Enter PIVOT Selections</Button>
        </Stack>
        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          {selectedTasks && <GanttWithCurrentTime tasksDataT={selectedTasks} />}
          <Card
            sx={{
              flexGrow: { md: 1 },
              display: { md: 'flex' },
              flexDirection: { md: 'row' },
              justifyContent: 'space-around',
            }}
          >
            <Button color="success">Roll-up by Fiscal Year</Button>
            <Button color="success">Roll-up by Calendar Year</Button>
          </Card>
        </Card>
      </Stack>
    </Container>
  );
}
