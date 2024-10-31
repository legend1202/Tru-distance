import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import Container from '@mui/material/Container';
import { Card, Grid, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { uploadBoePdf } from 'src/api/upload';

import { RHFUpload } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function BoeImportView() {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    boe: Yup.array().min(1, 'PDF is required'),
  });

  const defaultValues = useMemo(
    () => ({
      boe: [],
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Create success!');
      /* router.push(paths.dashboard.product.root); */
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const files = values.boe || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('boe', [...files, ...newFiles], { shouldValidate: true });
      const result = await uploadBoePdf(acceptedFiles);
      if (result) {
        enqueueSnackbar('Data Extraction success!');
      }
    },
    [setValue, values.boe, enqueueSnackbar]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.boe && values.boe?.filter((file) => file !== inputFile);
      setValue('boe', filtered);
    },
    [setValue, values.boe]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('boe', []);
  }, [setValue]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Data Import"
        links={[
          { name: 'BOE', href: paths.boe_mng.root },
          { name: 'DATA', href: paths.boe_mng.data_import },
          { name: 'IMPORT' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">BOE</Typography>
                  <RHFUpload
                    multiple
                    thumbnail
                    name="boe"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Other PDF process will be added</Typography>
                  <RHFUpload
                    multiple
                    thumbnail
                    name="other"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
